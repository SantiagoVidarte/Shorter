export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(request: NextRequest, { params }: { params: { shortId: string } }) {
  const { shortId } = params;

  const entry = await prisma.shortUrl.findUnique({
    where: { short: shortId }
  });

  if (!entry) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  await prisma.shortUrl.update({
    where: { short: shortId },
    data: { clicks: { increment: 1 } }
  });

  return NextResponse.redirect(entry.original);
}
