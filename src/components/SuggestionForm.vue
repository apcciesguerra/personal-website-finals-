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
      <div v-if="submissionStatus" class="status-message">{{ submissionStatus }}</div>
    </div>
  </template>
  
  <script>
  import { supabase } from '@/supabase'
  
  export default {
    name: 'SuggestionForm',
    data() {
      return {
        name: '',
        suggestion: '',
        important: false,
        submissionStatus: '',
        isSubmitting: false
      }
    },
    methods: {
      async submitSuggestion() {
        if (this.isSubmitting) return;
        
        this.isSubmitting = true;
        this.submissionStatus = 'Submitting...';
        
        try {
          console.log('Supabase URL:', supabase.supabaseUrl);
          console.log('Submitting to Supabase:', {
            name: this.name,
            suggestion: this.suggestion,
            important: this.important
          });
          
          // Test the connection first
          const { error: pingError } = await supabase.from('suggestions').select('count', { count: 'exact', head: true });
          
          if (pingError) {
            console.error('Connection test failed:', pingError);
            throw new Error('Could not connect to database. Please check your internet connection.');
          }
          
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
          this.name = '';
          this.suggestion = '';
          this.important = false;
          
          // Clear status message after 3 seconds
          setTimeout(() => {
            this.submissionStatus = '';
          }, 3000);
          
        } catch (error) {
          console.error('Error submitting suggestion:', error);
          this.submissionStatus = `ERROR SUBMITTING SUGGESTION: ${error.message || 'Please try again.'}`;
        } finally {
          this.isSubmitting = false;
        }
      }
    }
  }
  </script>