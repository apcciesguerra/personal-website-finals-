<template>
  <div id="app">
    <InteractiveGridPattern 
      :dotSize="1.5"
      dotColor="rgba(139, 92, 246, 0.2)"
      :dotSpacing="30"
      :interactiveRadius="150"
      interactiveColor="rgba(139, 92, 246, 0.4)"
    />
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
import InteractiveGridPattern from './components/ui/InteractiveGridPattern.vue'
import ExpandableGallery from './components/ui/ExpandableGallery.vue'

export default {
  name: 'App',
  components: {
    SuggestionForm,
    InteractiveGridPattern,
    ExpandableGallery
  },
  data() {
    return {
      scrolled: false,
      isGalleryVisible: false,
      galleryImages: [
        {
          src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80',
          title: 'Sunset at the Beach',
          description: 'A beautiful sunset view at the beach with golden hues.'
        },
        {
          src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
          title: 'Mountain View',
          description: 'A breathtaking view of mountains with snow-capped peaks.'
        },
        {
          src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'City Skyline',
          description: 'A panoramic view of a city skyline at night with lights.'
        },
        {
          src: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3433&q=80',
          title: 'Forest Trail',
          description: 'A serene path through a dense forest with sunlight filtering through.'
        },
        {
          src: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Ocean Waves',
          description: 'Powerful ocean waves crashing against rocks on a stormy day.'
        }
      ]
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
    },
    toggleGallery() {
      this.isGalleryVisible = !this.isGalleryVisible;
    }
  }
}
</script>

<style>
@import './assets/css/style.css';
@import './assets/css/cards.css';
@import './assets/css/form.css';
@import './assets/css/index.css';

#app {
  min-height: 100vh;
  width: 100%;
}
</style>
