import { NextResponse } from 'next/server';

const locales = ['tr', 'en', 'ar', 'ru', 'fa', 'fr', 'de', 'it', 'es', 'zh'];
const defaultLocale = 'tr';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip public files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  let locale = defaultLocale;
  if (!pathnameIsMissingLocale) {
    locale = pathname.split('/')[1];
  }

  // Create a new request headers object
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);

  // Return response with the modified request headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|images|.*\\..*).*)',
  ],
};
