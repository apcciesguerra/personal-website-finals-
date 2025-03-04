<template>
  <div id="app">
    <aurora-background>
      <tracing-beam>
        <!-- Splash Screen -->
        <div class="splash-screen">
          <div class="welcome-container">
            <hyper-text>
              <h1 class="welcome-text" :class="{ 'scrolled': scrolled }">WELCOME TO MY WEBPAGE</h1>
            </hyper-text>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="container">
            <header>
              <hyper-text>
                <h1>
                  <text-highlight color="rgba(139, 92, 246, 0.3)" activeColor="rgba(139, 92, 246, 0.6)">
                    Christian Luis Esguerra
                  </text-highlight>
                  <br>
                  <text-highlight color="rgba(124, 58, 237, 0.3)" activeColor="rgba(124, 58, 237, 0.6)" :delay="0.5">
                    ComSci Student
                  </text-highlight>
                </h1>
              </hyper-text>
            </header>
            <main>
              <section class="main-content">
                <!-- About Me Card -->
                <section class="content-section" ref="sections">
                  <strong>About Me</strong>
                  <p>
                    <text-highlight color="rgba(139, 92, 246, 0.2)" activeColor="rgba(139, 92, 246, 0.4)">
                      Hi! I'm Christian,
                    </text-highlight><br>
                    a 2nd year Computer Science student from Asia Pacific College,<br>
                    from section SS231.
                  </p>
                </section>

                <!-- Education Card -->
                <section class="content-section" ref="sections">
                  <strong>Education / Achievements</strong>
                  <p>
                    Graduated Junior High School from Espiritu Santo Parochial School.<br>
                    Graduated Senior High School from Asia Pacific College.
                  </p>
                </section>

                <!-- Course Card -->
                <section class="content-section" ref="sections">
                  <strong>Course</strong>
                  <p>BS Computer Science</p>
                  <div class="orbit-container">
                    <OrbitComponent :items="orbitItems" :radius="120" :speed="25" />
                  </div>
                </section>

                <!-- IT Experience Card -->
                <section class="content-section" ref="sections">
                  <strong>IT Experience</strong>
                  <p>
                    <text-highlight color="rgba(139, 92, 246, 0.2)" activeColor="rgba(139, 92, 246, 0.4)">
                      HTML, CSS, JavaScript, Python
                    </text-highlight>
                  </p>
                  <div class="logo-cloud-container">
                    <LogoCloudComponent :logos="techLogos" :speed="0.8" :density="1.2" />
                  </div>
                </section>

                <!-- Hobbies Card -->
                <section class="content-section" ref="sections">
                  <strong>Hobbies & Interests</strong>
                  <p>Going to the gym and playing video games</p>
                  <div class="stats-container">
                    <div class="stat-item">
                      <div class="stat-label">Hours Gaming Weekly</div>
                      <div class="stat-value">
                        <number-ticker :value="15" :duration="2000" suffix=" hrs" />
                      </div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-label">Gym Sessions Weekly</div>
                      <div class="stat-value">
                        <number-ticker :value="4" :duration="2000" />
                      </div>
                    </div>
                  </div>
                </section>

                <!-- Goals Card -->
                <section class="content-section" ref="sections">
                  <strong>Goals In Life / Dream</strong>
                  <p>
                    <text-highlight color="rgba(139, 92, 246, 0.2)" activeColor="rgba(139, 92, 246, 0.4)">
                      Current goal is to be able to graduate.
                    </text-highlight><br>
                    I like to only have short-term goals as it's easier for me to focus that way
                  </p>
                </section>

                <!-- Gallery Card -->
                <section class="content-section" ref="sections">
                  <strong>Picture Gallery</strong>
                  <image-slider></image-slider>
                </section>
              </section>
            </main>
          </div>

          <suggestion-form></suggestion-form>

          <footer>&copy; Asia Pacific College 2025</footer>
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
import HyperText from './components/ui/HyperText.vue'
import TextHighlight from './components/ui/TextHighlight.vue'
import NumberTicker from './components/ui/NumberTicker.vue'
import OrbitComponent from './components/ui/Orbit.vue'
import LogoCloudComponent from './components/ui/LogoCloud.vue'
import { techLogos, orbitItems } from './assets/logos.js'

export default {
  name: 'App',
  components: {
    ImageSlider,
    SuggestionForm,
    AuroraBackground,
    TracingBeam,
    HyperText,
    TextHighlight,
    NumberTicker,
    OrbitComponent,
    LogoCloudComponent
  },
  data() {
    return {
      scrolled: false,
      techLogos,
      orbitItems
    }
  },
  mounted() {
    // Set up scroll event listener
    window.addEventListener('scroll', this.handleScroll);
    
    // Set up intersection observer for sections
    this.setupSectionObserver();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollThreshold = window.innerHeight / 2;
      this.scrolled = window.scrollY > scrollThreshold;
    },
    setupSectionObserver() {
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

      this.$refs.sections.forEach(section => {
        observer.observe(section);
      });
    }
  }
}
</script>

<style>
@import './assets/css/style.css';
@import './assets/css/form.css';

#app {
  min-height: 100vh;
  width: 100%;
}

/* Utility Classes */
.logo-cloud-container {
  margin-top: 2rem;
  height: 200px;
  position: relative;
}

/* Stats Container Styling */
.stats-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  flex-wrap: wrap;
}

.stat-item {
  background: rgba(30, 30, 40, 0.7);
  padding: 15px 25px;
  border-radius: 12px;
  margin: 10px;
  min-width: 180px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  border-color: rgba(139, 92, 246, 0.4);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

/* Orbit Container Styling */
.orbit-container {
  margin: 20px auto;
  height: 350px;
  max-width: 100%;
}

/* About Me Card Special Styling */
.about-me-card {
  position: relative;
  overflow: hidden;
}

.about-me-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: -1;
}

.about-me-card:hover::after {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .welcome-text {
    font-size: 4rem;
  }
  
  header h1 {
    font-size: 2.5rem;
  }
  
  .card {
    width: 85%;
    padding: 20px;
  }
  
  .stats-container {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-item {
    width: 100%;
    margin: 10px 0;
  }
  
  .orbit-container {
    height: 250px;
  }
}

/* Content section styling (replacing cards) */
.content-section {
  color: white; 
  text-align: center;
  padding: 30px;
  margin: 25px 0; /* Space between each section */
  width: 65%;
  max-width: 1200px; /* Limit width */
  transition: all 0.6s ease; /* Smooth transitions */
  opacity: 0; /* Initially hidden */
  position: relative;
  transform: translateY(50px); /* Slight downward offset */
}

.content-section strong {
  display: block;
  margin-bottom: 15px;
}

.orbit-container, .logo-cloud-container {
  margin-top: 30px;
  height: 300px;
  width: 100%;
  position: relative;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
}

.stat-item {
  margin: 15px;
  text-align: center;
}

.stat-label {
  font-size: 1.2rem;
  margin-bottom: 10px;
  opacity: 0.8;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-section {
    width: 85%;
    padding: 20px;
  }
  
  .welcome-text {
    font-size: 3rem !important;
  }
  
  header h1 {
    font-size: 2rem !important;
    margin-bottom: 100px !important;
  }
}
</style>