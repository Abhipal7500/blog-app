import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
        const token = req.cookies.get('token')?.value;

        // If no token, redirect to login
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // Verify token (Decode JWT to check role)
        try {
            const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
            if (decoded.role !== 'admin' || !decoded.verified) {
                return NextResponse.redirect(new URL('/login', req.url)); // Redirect non-admin users to login
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next(); // Continue to the requested route
}

// Apply middleware only to /admin routes
export const config = {
    matcher: ['/admin/:path*'], // This applies middleware to /admin and all its subroutes
};
