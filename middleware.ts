import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log('Middleware triggered:', req.nextUrl.pathname);

    // Define protected routes
    const protectedRoutes = ['/admin'];

    // Initialize a Supabase client specifically for middleware
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // If accessing a protected route
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        console.log('Protected route accessed, checking authentication');

        // Try to get the current session directly
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            console.log('No active session found, redirecting to /adminlogin');
            return NextResponse.redirect(new URL('/adminlogin', req.url));
        }

        console.log('Session verified, user:', session.user.id);
        return res;
    }

    // Allow access to non-protected routes
    return res;
}

export const config = {
    matcher: ['/admin', '/adminlogin'],
};