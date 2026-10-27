import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      revalidatePath(`/${slug}`);
      revalidatePath(`/demo/${slug}`);
    } else {
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      target: slug ? `/${slug}` : 'all',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { revalidated: false, error: err?.message || 'Revalidation failed' },
      { status: 500 }
    );
  }
}
