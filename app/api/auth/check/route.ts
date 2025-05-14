// /api/auth/check
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        // Create a Supabase client configured for use in route handlers
        const supabase = createRouteHandlerClient({ cookies });

        // Get the user's session
        const { data: { session }, error } = await supabase.auth.getSession();

        // If there's an error or no session, return a 401 error
        if (error || !session) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Return the user's session data
        return NextResponse.json({
            authenticated: true,
            user: {
                id: session.user.id,
                email: session.user.email
            }
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to verify authentication' },
            { status: 500 }
        );
    }
}