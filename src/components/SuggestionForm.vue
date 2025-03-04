<template>
    <div id="app3">
      <form @submit.prevent="submitSuggestion">
        <strong>SUGGESTION BOX</strong>
        <p>
          ANY SUGGESTIONS FOR MY WEBSITE?
        </p>
        
        <!-- Simple input for name -->
        <input 
          type="text" 
          v-model="name"
          placeholder="Name"
          required
          class="regular-input"
        />
        
        <!-- Simple input for suggestion -->
        <input 
          type="text" 
          v-model="suggestion"
          placeholder="Input here!"
          required
          class="regular-input"
        />
        
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
import { supabase } from '../supabase'

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
  mounted() {
    // Prevent automatic focus
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
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
        
        // Submit to Supabase
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
          console.error('Error submitting suggestion:', error);
          throw error;
        }
        
        console.log('Submission successful:', data);
        this.submissionStatus = 'Thank you for your suggestion!';
        this.resetForm();
      } catch (error) {
        console.error('Failed to submit suggestion:', error);
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
    }
  }
}
</script>

<style scoped>
#app3 {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 16px;
  background-color: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

strong {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #a67fde;
  font-weight: 600;
  letter-spacing: 1px;
}

p {
  margin-bottom: 1.5rem;
  color: #a67fde;
  font-size: 1.2rem;
}

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

.regular-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  font-family: "Funnel Sans", sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.regular-input:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(166, 127, 222, 0.5);
  background: white;
}

button {
  padding: 10px 24px;
  background-color: #d9d9d9;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

button:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

input[type="checkbox"] {
  margin-left: 8px;
  transform: scale(1.2);
  cursor: pointer;
}
</style>
