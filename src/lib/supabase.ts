import { createClient, SupabaseClient } from '@supabase/supabase-js';

function isValidHttpUrl(str: string | undefined): boolean {
  if (!str) return false;
  try {
    const parsed = new URL(str);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

let rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
let rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Self-healing: if URL and Key were accidentally swapped in environment variables
if (rawUrl && rawKey && (rawUrl.startsWith('sb_') || rawUrl.startsWith('ey')) && rawKey.startsWith('http')) {
  const temp = rawUrl;
  rawUrl = rawKey;
  rawKey = temp;
}

const supabaseUrl = rawUrl?.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = rawKey?.trim();

export const isSupabaseConfigured: boolean = Boolean(
  isValidHttpUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey.length > 10
);

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  try {
    if (!supabaseClient) {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          fetch: (url, options = {}) => {
            return fetch(url, {
              ...options,
              next: { revalidate: 60 },
            });
          },
        },
      });
    }
    return supabaseClient;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
}

export const supabase = getSupabaseClient();

