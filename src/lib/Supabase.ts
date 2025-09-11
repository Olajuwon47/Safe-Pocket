/*import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Check if we're in development mode
const isDevelopment: boolean = process.env.NODE_ENV === 'development'

// Persistent client (stores session in localStorage)
export const supabasePersistent: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Ephemeral client (session cleared when tab closes)
export const supabaseEphemeral: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

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

// Create mock client for development when Supabase is not configured
const createMockClient = (): MockSupabaseClient => ({
  auth: {
    signUp: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Supabase not configured - using localStorage fallback' },
      }),
    signInWithPassword: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Supabase not configured - using localStorage fallback' },
      }),
    signInWithOAuth: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Supabase not configured - using localStorage fallback' },
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

// Initialize Supabase client
const initializeSupabase = (): SupabaseClient | MockSupabaseClient => {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isDevelopment) {
      console.warn(
        'Supabase environment variables are missing. Using mock client for development.'
      )
      return createMockClient()
    } else {
      throw new Error('Missing Supabase environment variables')
    }
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase =initializeSupabase()*/







import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Load env vars from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV

// ---- Mock Client Type ----
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

// ---- Initialize Supabase or Mock ----
let supabaseClient: SupabaseClient | MockSupabaseClient

if (!supabaseUrl || !supabaseAnonKey) {
  if (isDevelopment) {
    console.warn('[Supabase] Missing env vars. Using mock client for development.')
    supabaseClient = createMockClient()
  } else {
    throw new Error('[Supabase] Missing environment variables')
  }
} else {
  // Persistent client (saves session in localStorage)
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'supabase-persistent',
    },
  })
}

// ---- Ephemeral client (session cleared when tab closes) ----
export const supabaseEphemeral: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      storageKey: 'supabase-ephemeral',
    },
  }
)

// ---- Default export ----
export const supabase = supabaseClient





