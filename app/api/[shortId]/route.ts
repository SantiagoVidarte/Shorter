// app/[shortId]/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ shortId: string }> }
  ) {
    const { shortId } = await context.params;
  
    const entry = await prisma.shortUrl.findUnique({
      where: { short: shortId },
    });
  
    if (!entry) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  
    await prisma.shortUrl.update({
      where: { short: shortId },
      data: { clicks: { increment: 1 } },
    });
  
    return NextResponse.redirect(entry.original);}