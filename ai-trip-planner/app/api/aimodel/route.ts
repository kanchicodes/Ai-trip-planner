import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // For demo, just echo the last user message or a static response
    const lastUserMsg = body.messages?.filter((m: any) => m.role === 'user').pop();
    const resp = lastUserMsg ? `You said: ${lastUserMsg.content}` : 'Hello from AI Model!';
    return NextResponse.json({ resp });
  } catch (error) {
    return NextResponse.json({ resp: 'Error processing your request.' }, { status: 500 });
  }
}
