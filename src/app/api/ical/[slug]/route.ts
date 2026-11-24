import { NextRequest, NextResponse } from 'next/server';
import { generatePropertyIcs } from '@/lib/icalExport';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    if (!slug) {
      return new NextResponse('Missing property slug', { status: 400 });
    }

    const icsContent = await generatePropertyIcs(slug);

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `inline; filename="${slug}-calendar.ics"`,
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[API /api/ical/[slug]] Failed to generate ics:', error);
    return new NextResponse('Error generating calendar feed', { status: 500 });
  }
}
