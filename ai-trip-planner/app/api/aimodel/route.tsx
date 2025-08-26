
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { aj } from '../arcjet/route';
import { currentUser } from '@clerk/nextjs/server';

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user's answer before asking the next:

Starting location (source)
Destination city or country
Group size (Solo, Couple, Family, Friends)
Budget (Low, Medium, High)
Trip duration (number of days)
Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.

If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.`;

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();
  const user = await currentUser();
  const decision = await aj.protect(req, { requested: isFinal ? 5 : 0 });
  console.log('Arcjet decision', decision);
  if (decision.isDenied && decision.isDenied()) {
    return NextResponse.json({
      resp: 'No Free Credit Remaining',
      ui: 'limit'
    });
  }
  const systemPrompt = PROMPT;
  const formattedMessages = (messages || []).map((msg: any) => ({
    role: typeof msg.role === 'string' ? msg.role : 'user',
    content: typeof msg.content === 'string' ? msg.content : ''
  }));
  let response;
  try {
    const payload = {
      model: 'openai/gpt-oss-20b:free',
      response_format: { type: 'json_object' as 'json_object' },
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        ...formattedMessages,
      ],
    };
    try {
      const completion = await openai.chat.completions.create(payload);
      console.log('OpenRouter API raw response:', completion);
      const message = completion.choices[0].message;
      console.log('AI message content:', message.content);
      try {
        response = NextResponse.json(JSON.parse(message.content ?? '{"TextResp":"AI returned blank response.","ui":"final"}'));
      } catch (jsonError) {
        console.error('AI response is not valid JSON:', jsonError, 'Raw content:', message.content);
        response = NextResponse.json({
          error: 'AI did not return valid JSON.',
          details: message.content,
          ui: 'final',
          TextResp: 'AI did not return a valid response. Please try again or rephrase your request.'
        }, { status: 200 });
      }
    } catch (apiError) {
      console.error('OpenAI/OpenRouter API error:', apiError, 'Payload:', payload);
      response = NextResponse.json({ error: 'OpenAI/OpenRouter API error', details: apiError }, { status: 500 });
    }
  } catch (e) {
    console.error('General error in /api/aimodel:', e);
    response = NextResponse.json({ error: 'General error', details: e }, { status: 500 });
  }
  return response;
}
