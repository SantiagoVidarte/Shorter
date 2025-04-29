import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  // Acá deberías crear el short URL de verdad
  const shortUrl = Math.random().toString(36).substring(2, 5);

  return NextResponse.json({ url ,shortUrl });
}



