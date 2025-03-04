<template>
  <div id="app">
    <div class="splash-screen">
      <div class="welcome-container">
        <h1 class="welcome-text" :class="{ 'scrolled': scrolled }">WELCOME TO MY WEBPAGE</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="container">
        <header>
          <h1>Christian Luis Esguerra<br>
              ComSci Student</h1>
        </header>
      </div>

      <suggestion-form></suggestion-form>

      <footer> Asia Pacific College 2025</footer>
    </div>
  </div>
</template>

<script>
import SuggestionForm from './components/SuggestionForm.vue'

export default {
  name: 'App',
  components: {
    SuggestionForm
  },
  data() {
    return {
      scrolled: false
    }
  },
  mounted() {
    // Set up scroll event listener
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollThreshold = window.innerHeight / 2;
      this.scrolled = window.scrollY > scrollThreshold;
    }
  }
}
</script>

<style>
@import './assets/css/style.css';
@import './assets/css/cards.css';
@import './assets/css/form.css';

#app {
  min-height: 100vh;
  width: 100%;
}
</style>
