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
        <button type="submit">SUBMIT</button>
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
        submissionStatus: ''
      }
    },
    methods: {
      async submitSuggestion() {
        try {
          this.submissionStatus = 'Submitting...'
          
          const { error } = await supabase
            .from('suggestions')
            .insert([
              { 
                name: this.name,
                suggestion: this.suggestion,
                important: this.important,
                created_at: new Date()
              }
            ])
          
          if (error) throw error
          
          this.submissionStatus = 'Thank you for your suggestion!'
          this.name = ''
          this.suggestion = ''
          this.important = false
          
          // Clear status message after 3 seconds
          setTimeout(() => {
            this.submissionStatus = ''
          }, 3000)
          
        } catch (error) {
          console.error('Error submitting suggestion:', error)
          this.submissionStatus = 'Error submitting suggestion. Please try again.'
        }
      }
    }
  }
  </script>