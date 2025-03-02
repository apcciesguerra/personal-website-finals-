// This file is for testing the Supabase connection
import { supabase } from './supabase'

// Function to test the connection
async function testSupabaseConnection() {
  console.log('Testing Supabase connection...')
  console.log('Supabase URL:', supabase.supabaseUrl)
  
  try {
    // First, test basic connectivity
    const { error: pingError } = await supabase.from('_pgrpc').select('*', { count: 'exact', head: true }).limit(1)
    
    if (pingError) {
      console.error('Basic connection test failed:', pingError)
      return { success: false, error: 'Cannot connect to Supabase: ' + pingError.message }
    }
    
    // Then, test if the suggestions table exists
    const { error: tableError } = await supabase.from('suggestions').select('count', { count: 'exact', head: true })
    
    if (tableError) {
      console.error('Table test failed:', tableError)
      return { success: false, error: 'Table "suggestions" may not exist: ' + tableError.message }
    }
    
    console.log('Connection successful!')
    return { success: true }
  } catch (error) {
    console.error('Connection test error:', error)
    return { success: false, error: 'Unexpected error: ' + (error.message || 'Unknown error') }
  }
}

// Export the test function
export { testSupabaseConnection } 