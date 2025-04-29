// app/api/shortUrl/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // 1) Leer el body crudo y loguearlo
    const rawBody = await req.text();

    // 2) Parsear con fallback a objeto vacío
    const body = rawBody ? JSON.parse(rawBody) : {};
    const { url } = body;

    // 3) Validación
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // 4) Generar shortId y guardar en la DB
    const shortId = nanoid(7);
    const entry = await prisma.shortUrl.create({
      data: { original: url, short: shortId, clicks: 0 },
    });

    // 5) Devolver la URL corta completa
    return NextResponse.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${entry.short}`,
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
