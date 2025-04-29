export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const shortId = pathname.split('/').pop();

  try {
    console.log('Redirect handler hit for:', shortId);

    const entry = await prisma.shortUrl.findUnique({
      where: { short: shortId! },
    });

    if (!entry) {
      console.warn('No entry found for', shortId);
      return NextResponse.redirect(new URL('/404', request.url));
    }

    await prisma.shortUrl.update({
      where: { short: shortId! },
      data: { clicks: { increment: 1 } },
    });

    console.log('Redirecting to:', entry.original);

    return NextResponse.redirect(entry.original);
  } catch (err) {
    console.error('❌ Redirect error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', detail: String(err) },
      { status: 500 }
    );
  }
}
