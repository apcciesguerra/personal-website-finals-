import { createClient } from '@supabase/supabase-js'

// Make sure the URL is properly formatted with https://
const supabaseUrl = 'https://rgtalnqelpfzjjtlbfev.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM'

// Create the Supabase client with optimized options for CORS
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.x',
      'Content-Type': 'application/json'
    },
    fetch: fetch
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Log connection details for debugging
console.log('Supabase client initialized with URL:', supabaseUrl)
console.log('Connected to Supabase schema:', 'public')