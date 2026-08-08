import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 1. Fix malformed crawler URLs like /https:/kardeslercihangir.com/foo or /http:/...
  const malformedMatch = pathname.match(/^\/(?:https?:(?:\/)*(?:kardeslercihangir\.com)?)(.*)$/i);
  if (malformedMatch) {
    let cleanPath = malformedMatch[1] || "/";
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

    // If it points to an old WooCommerce product, redirect to /menu
    if (
      cleanPath.startsWith("/urun/") ||
      cleanPath.startsWith("/product/") ||
      cleanPath.startsWith("/urun-kategori/") ||
      cleanPath.startsWith("/product-category/")
    ) {
      cleanPath = "/menu";
    }

    url.pathname = cleanPath;
    return NextResponse.redirect(url, 301);
  }

  // 2. Fallback check for any legacy /urun/ or /product/ paths
  if (
    pathname.startsWith("/urun/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/urun-kategori/") ||
    pathname.startsWith("/product-category/")
  ) {
    url.pathname = "/menu";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static assets: images, logo.webp, etc.
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico|logo.webp|manifest.webmanifest).*)",
  ],
};
