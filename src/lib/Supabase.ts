import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isDevelopment = import.meta.env.MODE === 'development'
const HEALTHCHECK_TIMEOUT_MS = 2000

type AuthFallbackResponse = {
  data: null
  error: { message: string }
}

const createMockClient = () => ({
  auth: {
    signUp: async (): Promise<AuthFallbackResponse> => ({
      data: null,
      error: { message: 'Supabase is unavailable right now. Please check your project URL.' },
    }),
    signInWithPassword: async (): Promise<AuthFallbackResponse> => ({
      data: null,
      error: { message: 'Supabase is unavailable right now. Please check your project URL.' },
    }),
    signInWithOAuth: async (): Promise<AuthFallbackResponse> => ({
      data: null,
      error: { message: 'Supabase is unavailable right now. Please check your project URL.' },
    }),
    signOut: async (): Promise<AuthFallbackResponse> => ({
      data: null,
      error: { message: 'Supabase is unavailable right now. Please check your project URL.' },
    }),
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ 
      data: { subscription: { unsubscribe: () => {} } }
    })
  }
})

const isSupabaseReachable = async (url: string) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), HEALTHCHECK_TIMEOUT_MS)

  try {
    const response = await fetch(new URL('/auth/v1/health', url), {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    })

    return response.ok
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}

const initializeSupabase = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isDevelopment) {
      console.warn('Supabase environment variables are missing. Using mock client for development.')
      return createMockClient()
    } else {
      throw new Error('Missing Supabase environment variables')
    }
  }

  const reachable = await isSupabaseReachable(supabaseUrl)

  if (!reachable) {
    console.warn('Supabase endpoint is unreachable. Using mock client to avoid auth refresh errors.')
    return createMockClient()
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = await initializeSupabase()
