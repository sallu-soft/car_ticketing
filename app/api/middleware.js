import { NextRequest, NextResponse } from 'next/server';

export function middleware(request) {
  const password = request.headers.get('x-password') || request.nextUrl.searchParams.get('password');

  if (password !== process.env.PAGE_PASSWORD) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.next({
    props: {
      password: true,
    },
  });
}