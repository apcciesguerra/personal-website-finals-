import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://rgtalnqelpfzjjtlbfev.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM'

// Create Supabase client with options to handle fetch errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
}) 