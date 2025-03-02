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
  import { supabase } from '@/supabase'
  import { testSupabaseConnection } from '@/supabaseTest'
  
  export default {
    name: 'SuggestionForm',
    data() {
      return {
        name: '',
        suggestion: '',
        important: false,
        submissionStatus: '',
        isSubmitting: false,
        isError: false
      }
    },
    methods: {
      async submitSuggestion() {
        if (this.isSubmitting) return;
        
        this.isSubmitting = true;
        this.submissionStatus = 'Submitting...';
        this.isError = false;
        
        try {
          // Test connection before submitting
          console.log('Testing connection to Supabase...');
          const connectionTest = await testSupabaseConnection();
          
          if (!connectionTest.success) {
            console.error('Connection test failed:', connectionTest.error);
            throw new Error(connectionTest.error || 'Database connection error');
          }
          
          console.log('Submitting to Supabase:', {
            name: this.name,
            suggestion: this.suggestion,
            important: this.important
          });
          
          const { error } = await supabase
            .from('suggestions')
            .insert({
              name: this.name,
              suggestion: this.suggestion,
              important: this.important
            });
          
          if (error) {
            console.error('Supabase error details:', error);
            throw error;
          }
          
          this.submissionStatus = 'Thank you for your suggestion!';
          this.resetForm();
          
        } catch (error) {
          console.error('Error submitting suggestion:', error);
          this.isError = true;
          this.submissionStatus = `ERROR SUBMITTING SUGGESTION: ${error.message || 'Unknown error'}`;
        } finally {
          this.isSubmitting = false;
          
          // Clear status message after 5 seconds
          setTimeout(() => {
            this.submissionStatus = '';
          }, 5000);
        }
      },
      
      resetForm() {
        this.name = '';
        this.suggestion = '';
        this.important = false;
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