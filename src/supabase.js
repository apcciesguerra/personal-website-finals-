import { createClient } from '@supabase/supabase-js'

// Make sure the URL is properly formatted with https://
const supabaseUrl = 'https://rgtalnqelpfzjjtlbfev.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM'

// Create the Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
}) 