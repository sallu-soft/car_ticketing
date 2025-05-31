import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin-login';
  const isLoggedIn = request.cookies.get('admin-auth')?.value === 'true';

  if (isAdminRoute && !isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
