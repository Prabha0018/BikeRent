import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://umeqkaqdmhkjrdtgqcua.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZXFrYXFkbWhranJkdGdxY3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODQ3OTIsImV4cCI6MjA2MDM2MDc5Mn0.j5ZOToBecFGD2fSNud3w1coPjqRaM9Yo66nMpRlszOY'

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options) 