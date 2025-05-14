// This file provides Supabase client directly from server components
// in Next.js app directory

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
    return createServerComponentClient({ cookies });
}