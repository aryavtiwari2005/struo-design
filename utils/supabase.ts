// utils/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Initialize Supabase client for client components
export const supabase = createClientComponentClient();