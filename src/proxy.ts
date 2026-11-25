import { NextRequest, NextResponse } from 'next/server';

const SUBDOMAIN_ALIASES: Record<string, string> = {
  'gorna-chata': 'zakopane-gorna-chata',
  'zakopane': 'zakopane-gorna-chata',
  'mazury': 'mazury-domek-nad-jeziorem',
  'bieszczady': 'bieszczadzka-ostoja',
  'trojmiasto': 'trojmiejski-apartament',
  'krakow': 'krakow-kazimierz-loft',
};

const MAIN_DOMAINS = new Set([
  'nestay.co',
  'www.nestay.co',
  'localhost',
  '127.0.0.1',
  'nestay.co',
]);

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Clean host (strip port number if present, e.g. localhost:3000)
  const host = hostname.split(':')[0].toLowerCase();

  // Never alter internal Next.js assets, favicon, or explicit top-level API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname === '/favicon.ico' ||
    url.pathname.startsWith('/bookings') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/demo')
  ) {
    return NextResponse.next();
  }

  // Detect subdomain
  let subdomain: string | null = null;

  if (host.endsWith('.nestay.co')) {
    subdomain = host.replace('.nestay.co', '');
  } else if (host.endsWith('.nestay.co')) {
    subdomain = host.replace('.nestay.co', '');
  } else if (host.endsWith('.localhost')) {
    subdomain = host.replace('.localhost', '');
  }

  if (subdomain && subdomain !== 'www' && !MAIN_DOMAINS.has(host)) {
    // Resolve alias or use direct slug
    const resolvedSlug = SUBDOMAIN_ALIASES[subdomain] || subdomain;

    // Subdomain root (e.g. https://gorna-chata.nestay.co/) -> rewrite to /[slug]
    if (url.pathname === '/' || url.pathname === '') {
      return NextResponse.rewrite(new URL(`/${resolvedSlug}`, req.url));
    }

    // Subdomain calendar export (e.g. https://gorna-chata.nestay.co/calendar.ics)
    if (url.pathname === '/calendar.ics') {
      return NextResponse.rewrite(new URL(`/api/ical/${resolvedSlug}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
