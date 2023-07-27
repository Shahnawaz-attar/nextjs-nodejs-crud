import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public URLs that don't require authentication
  const publicUrls = ['/login', '/signup'];

  // Check if the requested URL is a public URL
  const isPublicUrl = publicUrls.includes(path);

  const token = request.cookies.get('token');

  if (isPublicUrl && token) {
    // If it's a public URL (login/signup) and the user has a token, redirect to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isPublicUrl && !token) {
    // If it's not a public URL and the user doesn't have a token, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // If the URL doesn't match any conditions above or if the user has a token on a public URL, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/login',
    '/signup',
    '/addpost',
    '/addpost/:path*',
  ], // Use '/addpost/[id]' instead of '/addpost/:id'
};
