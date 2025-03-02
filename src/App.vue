<template>
  <div id="app">
    <aurora-background>
      <tracing-beam>
        <!-- Splash Screen -->
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
            <main>
              <section class="main-content">
                <!-- About Me Card -->
                <div class="card" v-for="(card, index) in cards" :key="index" ref="cards">
                  <strong>{{ card.title }}</strong>
                  <p v-if="card.content">{{ card.content }}</p>
                  <image-slider v-if="card.hasGallery"></image-slider>
                </div>
              </section>
            </main>
          </div>

          <suggestion-form></suggestion-form>

          <footer>© Asia Pacific College 2025</footer>
        </div>
      </tracing-beam>
    </aurora-background>
  </div>
</template>

<script>
import ImageSlider from './components/ImageSlider.vue'
import SuggestionForm from './components/SuggestionForm.vue'
import AuroraBackground from './components/ui/AuroraBackground.vue'
import TracingBeam from './components/ui/TracingBeam.vue'

export default {
  name: 'App',
  components: {
    ImageSlider,
    SuggestionForm,
    AuroraBackground,
    TracingBeam
  },
  data() {
    return {
      scrolled: false,
      cards: [
        {
          title: "About Me",
          content: "Hi! I'm Christian,\na 2nd year Computer Science student from Asia Pacific College,\nfrom section SS231."
        },
        {
          title: "Education / Achievements",
          content: "Graduated Junior High School from Espiritu Santo Parochial School.\nGraduated Senior High School from Asia Pacific College."
        },
        {
          title: "Course",
          content: "BS Computer Science"
        },
        {
          title: "IT Experience",
          content: "HTML, CSS, JavaScript, Python"
        },
        {
          title: "Hobbies & Interests",
          content: "Going to the gym and playing video games"
        },
        {
          title: "Goals In Life / Dream",
          content: "Current goal is to be able to graduate.\nI like to only have short-term goals as it's easier for me to focus that way"
        },
        {
          title: "Picture Gallery",
          content: "",
          hasGallery: true
        }
      ]
    }
  },
  mounted() {
    // Set up scroll event listener
    window.addEventListener('scroll', this.handleScroll);
    
    // Set up intersection observer for cards
    this.setupCardObserver();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollThreshold = window.innerHeight / 2;
      this.scrolled = window.scrollY > scrollThreshold;
    },
    setupCardObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      this.$refs.cards.forEach(card => {
        observer.observe(card);
      });
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