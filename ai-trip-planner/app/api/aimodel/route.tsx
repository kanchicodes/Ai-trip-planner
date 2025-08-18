import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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
Always maintain a conversational, interactive style while asking questions.

Along with response also send which ui component to display for generative UI for example budget/groupSize/tripDuration/final, where Final means AI generating complete final output

Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
json{
  "ui": "budget/groupSize/tripDuration/final",
  "TextResp": ""
}`


export async function POST(req: NextRequest) {
    const { messages } = await req.json();
    try {
        const payload = {
            model: 'openai/gpt-oss-20b:free',
            response_format: { type: 'json_object' as 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: PROMPT,
                },
                ...messages,
            ],
        };
        try {
            const completion = await openai.chat.completions.create(payload);
            console.log('OpenRouter API raw response:', completion);
            const message = completion.choices[0].message;
            console.log('AI message content:', message.content);
            return NextResponse.json(JSON.parse(message.content ?? '{"TextResp":"AI returned blank response.","ui":"final"}'));
        } catch (apiError) {
            console.error('OpenAI/OpenRouter API error:', apiError, 'Payload:', payload);
            return NextResponse.json({ error: 'OpenAI/OpenRouter API error', details: apiError }, { status: 500 });
        }
    } catch (e) {
        console.error('General error in /api/aimodel:', e);
        return NextResponse.json({ error: 'General error', details: e }, { status: 500 });
    }
}