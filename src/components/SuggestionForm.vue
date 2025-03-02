<template>
    <div id="app3">
      <form @submit.prevent="submitSuggestion">
        <strong>SUGGESTION BOX</strong>
        <p>
          ANY SUGGESTIONS FOR MY WEBSITE?
        </p>
        <p>
          <input type="text" required placeholder="Name" v-model="name">
        </p>
        <p>
          <input type="text" required placeholder="Input here!" v-model="suggestion">
        </p>
        <p>
          CONFIRM
          <label>
            <input type="checkbox" v-model="important">
          </label>
        </p>
        <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'SUBMITTING...' : 'SUBMIT' }}</button>
      </form>
      <div v-if="submissionStatus" class="status-message" :class="{ error: isError }">{{ submissionStatus }}</div>
    </div>
  </template>
  
  <script>
  // Direct import of Supabase client
  import { supabase } from '@/supabase'
  
  export default {
    name: 'SuggestionForm',
    data() {
      return {
        name: '',
        suggestion: '',
        important: false,
        submissionStatus: '',
        isSubmitting: false,
        isError: false,
        connectionStatus: null
      }
    },
    mounted() {
      console.log('SuggestionForm component mounted');
      // Test connection on mount
      this.testConnection();
    },
    methods: {
      async submitSuggestion() {
        if (this.isSubmitting) return;
        
        this.isSubmitting = true;
        this.submissionStatus = 'Submitting...';
        this.isError = false;
        
        try {
          console.log('Submitting suggestion with data:', {
            name: this.name,
            suggestion: this.suggestion,
            important: this.important
          });
          
          // Use direct API call as primary method
          try {
            console.log('Attempting direct API submission');
            const response = await fetch('https://rgtalnqelpfzjjtlbfev.supabase.co/rest/v1/suggestions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM`,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({
                name: this.name,
                suggestion: this.suggestion,
                important: this.important
              })
            });
            
            if (!response.ok) {
              const errorText = await response.text();
              console.error('Direct API error response:', errorText);
              throw new Error(`API error: ${response.status} - ${errorText}`);
            }
            
            console.log('Direct API submission successful');
            this.submissionStatus = 'Thank you for your suggestion!';
            this.resetForm();
            return;
          } catch (directError) {
            console.error('Direct API submission failed, trying Supabase client:', directError);
            // Fall back to Supabase client
          }
          
          // Try Supabase client as fallback
          const { data, error } = await supabase
            .from('suggestions')
            .insert([
              {
                name: this.name,
                suggestion: this.suggestion,
                important: this.important
              }
            ]);
          
          if (error) {
            console.error('Supabase client error:', error);
            throw error;
          }
          
          console.log('Submission successful via Supabase client:', data);
          this.submissionStatus = 'Thank you for your suggestion!';
          this.resetForm();
        } catch (error) {
          console.error('All submission attempts failed:', error);
          this.isError = true;
          this.submissionStatus = `Error: ${error.message || 'Failed to submit suggestion'}`;
        } finally {
          this.isSubmitting = false;
          setTimeout(() => {
            this.submissionStatus = '';
          }, 5000);
        }
      },
      
      resetForm() {
        this.name = '';
        this.suggestion = '';
        this.important = false;
      },
      
      async testConnection() {
        try {
          console.log('Testing connection to Supabase...');
          
          // Try direct API call first
          try {
            const response = await fetch('https://rgtalnqelpfzjjtlbfev.supabase.co/rest/v1/suggestions?select=count', {
              method: 'GET',
              headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndGFsbnFlbHBmempqdGxmYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDY0ODIsImV4cCI6MjA1NjQ4MjQ4Mn0.V3EdMSi5bTzqjyDLybqJcjK0Y281xdTY0Ej07PtamGM`
              }
            });
            
            if (response.ok) {
              console.log('Direct API connection test successful');
              this.connectionStatus = true;
              return;
            } else {
              console.error('Direct API connection test failed:', response.status);
            }
          } catch (directError) {
            console.error('Direct API connection test failed:', directError);
          }
          
          // Fall back to Supabase client
          const { data, error } = await supabase.from('suggestions').select('count');
          
          if (error) {
            console.error('Supabase connection test failed:', error);
            this.connectionStatus = false;
          } else {
            console.log('Supabase connection test successful:', data);
            this.connectionStatus = true;
          }
        } catch (error) {
          console.error('Error testing connection:', error);
          this.connectionStatus = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .status-message {
    margin-top: 10px;
    padding: 8px;
    border-radius: 4px;
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .status-message.error {
    background-color: #ffebee;
    color: #c62828;
  }
  </style>