// This file is for testing the Supabase connection
import { supabase } from './supabase'

// Function to test the connection
async function testSupabaseConnection() {
  console.log('Testing Supabase connection...')
  console.log('Supabase URL:', supabase.supabaseUrl)
  
  try {
    // Try to ping the database
    const { data, error } = await supabase.from('suggestions').select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Connection test failed:', error)
      return false
    }
    
    console.log('Connection successful!')
    return true
  } catch (error) {
    console.error('Connection test error:', error)
    return false
  }
}

// Export the test function
export { testSupabaseConnection } 