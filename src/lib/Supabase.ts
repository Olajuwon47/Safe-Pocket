import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Load env vars from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV

// Define a type for our mock client
interface MockSupabaseClient {
  auth: {
    signUp: () => Promise<{ data: null; error: { message: string } }>
    signInWithPassword: () => Promise<{ data: null; error: { message: string } }>
    signInWithOAuth: () => Promise<{ data: null; error: { message: string } }>
    getSession: () => Promise<{ data: { session: null } }>
    onAuthStateChange: () => {
      data: {
        subscription: { unsubscribe: () => void }
      }
    }
  }
}

// ---- Mock Client Implementation ----
const createMockClient = (): MockSupabaseClient => ({
  auth: {
    signUp: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Supabase not configured - using mock client' },
      }),
    signInWithPassword: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Supabase not configured - using mock client' },
      }),
    signInWithOAuth: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Supabase not configured - using mock client' },
      }),
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    }),
  },
})


const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isDevelopment) {
      console.warn('[Supabase] Missing env vars. Using mock client for development.')
      return createMockClient()
    } else {
      throw new Error('[Supabase] Missing environment variables')
    }
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

export const supabase: SupabaseClient | MockSupabaseClient = createSupabaseClient()
