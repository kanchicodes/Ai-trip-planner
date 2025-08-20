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


const FINAL_PROMPT = ` Generate Travel Plan with give details, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image Url, Geo Coordinates, Place address, ticket Pricing, Time travel each of the location, with each day plan with best time to visit in JSON format.
Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_price": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`


export async function POST(req: NextRequest) {
    const { messages, isFinal } = await req.json();
    // Build a summary of collected answers so far
    const answers: Record<string, string> = {};
    messages?.forEach((msg: any) => {
        if (msg.role === 'user') {
            // Try to infer which question this answer is for, based on previous assistant message
            const prevAssistant = messages[messages.indexOf(msg) - 1];
            if (prevAssistant && prevAssistant.role === 'assistant' && prevAssistant.ui) {
                if (prevAssistant.ui === 'startingLocation') answers.origin = msg.content;
                if (prevAssistant.ui === 'destination') answers.destination = msg.content;
                if (prevAssistant.ui === 'groupSize') answers.group_size = msg.content;
                if (prevAssistant.ui === 'budget') answers.budget = msg.content;
                if (prevAssistant.ui === 'tripDuration') answers.duration = msg.content;
                // Add more as needed
            }
        }
    });
    let summary = '';
    if (Object.keys(answers).length > 0) {
        summary = 'Collected answers so far:\n';
        Object.entries(answers).forEach(([k, v]) => {
            summary += `${k}: ${v}\n`;
        });
    }
    const systemPrompt = isFinal
        ? FINAL_PROMPT
        : (summary ? summary + '\n' + PROMPT : PROMPT);
    try {
        const payload = {
            model: 'openai/gpt-oss-20b:free',
            response_format: { type: 'json_object' as 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
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