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
  import { testSupabaseConnection } from '@/supabaseTest'
  
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
          // First check if Supabase is connected
          const connectionTest = await testSupabaseConnection();
          if (!connectionTest.success) {
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