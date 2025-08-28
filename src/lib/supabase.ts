import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Check if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development'

// Create mock client for development when Supabase is not configured
const createMockClient = () => ({
  auth: {
    signUp: () => Promise.resolve({ 
      data: null, 
      error: { message: 'Supabase not configured - using localStorage fallback' } 
    }),
    signInWithPassword: () => Promise.resolve({ 
      data: null, 
      error: { message: 'Supabase not configured - using localStorage fallback' } 
    }),
    signInWithOAuth: () => Promise.resolve({ 
      data: null, 
      error: { message: 'Supabase not configured - using localStorage fallback' } 
    }),
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ 
      data: { 
        subscription: { unsubscribe: () => {} } 
      } 
    })
  }
})

// Initialize Supabase client
const initializeSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isDevelopment) {
      console.warn('Supabase environment variables are missing. Using mock client for development.')
      return createMockClient()
    } else {
      throw new Error('Missing Supabase environment variables')
    }
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = initializeSupabase()
