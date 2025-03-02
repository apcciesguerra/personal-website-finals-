import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Try direct API call first (more reliable)
    try {
      console.log('Trying direct API call to test connection')
      const response = await fetch('https://rgtalnqelpfzjjtlbfev.supabase.co/rest/v1/suggestions?select=count', {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM`
        }
      })
      
      if (response.ok) {
        console.log('Direct API connection test successful')
        return { success: true, data: await response.json() }
      } else {
        console.error('Direct API connection test failed:', response.status)
        // Continue to try Supabase client
      }
    } catch (directError) {
      console.error('Direct API connection test failed:', directError)
      // Continue to try Supabase client
    }
    
    // Try Supabase client as fallback
    const { data: pingData, error: pingError } = await supabase.from('suggestions').select('count')
    
    if (pingError) {
      console.error('Supabase client connection test failed:', pingError)
      return { success: false, error: pingError }
    } else {
      console.log('Supabase client connection test successful:', pingData)
      return { success: true, data: pingData }
    }
  } catch (error) {
    console.error('Error testing Supabase connection:', error)
    return { success: false, error }
  }
} 