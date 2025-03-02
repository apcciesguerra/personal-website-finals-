<template>
  <div class="tracing-beam-container">
    <div class="tracing-beam-content">
      <slot></slot>
    </div>
    <div class="tracing-beam" ref="tracingBeam">
      <div class="tracing-beam-gradient"></div>
    </div>
    <div class="tracing-beam-dots">
      <div 
        v-for="(_, index) in 7" 
        :key="index" 
        class="tracing-beam-dot"
        :class="{ 'active': activeDot === index }"
        :style="{ top: `${(index + 1) * 14}%` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TracingBeam',
  data() {
    return {
      activeDot: 0,
      sections: [],
      observer: null
    }
  },
  mounted() {
    this.setupTracingBeam();
    window.addEventListener('scroll', this.handleScroll);
    
    // Set up intersection observer for sections
    this.$nextTick(() => {
      this.setupSectionObserver();
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    setupTracingBeam() {
      // Initialize the beam position
      this.handleScroll();
    },
    setupSectionObserver() {
      // Find all major sections to track
      this.sections = Array.from(document.querySelectorAll('.card, header, .splash-screen'));
      
      // Create an intersection observer
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Find the index of the section
            const index = this.sections.indexOf(entry.target);
            if (index !== -1) {
              // Map the section index to a dot index (max 7 dots)
              this.activeDot = Math.min(Math.floor(index * 7 / this.sections.length), 6);
            }
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      });
      
      // Observe all sections
      this.sections.forEach(section => {
        this.observer.observe(section);
      });
    },
    handleScroll() {
      const tracingBeam = this.$refs.tracingBeam;
      if (!tracingBeam) return;

      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;

      // Update the beam height based on scroll progress
      const beamHeight = Math.max(scrollProgress * 100, 5); // Minimum 5% height
      tracingBeam.style.height = `${beamHeight}%`;

      // Update gradient position for a more dynamic effect
      const gradientPos = Math.min(scrollProgress * 200, 100);
      const beamGradient = tracingBeam.querySelector('.tracing-beam-gradient');
      beamGradient.style.top = `${gradientPos}%`;
    }
  }
}
</script>

<style scoped>
.tracing-beam-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.tracing-beam-content {
  position: relative;
  z-index: 10;
  width: 100%;
}

.tracing-beam {
  position: fixed;
  top: 0;
  left: 5%;
  width: 4px;
  height: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  z-index: 5;
  pointer-events: none;
}

.tracing-beam-gradient {
  position: absolute;
  width: 100%;
  height: 60%;
  background: linear-gradient(
    to bottom,
    rgba(76, 29, 149, 0),
    rgba(124, 58, 237, 0.6),
    rgba(139, 92, 246, 0.8),
    rgba(167, 139, 250, 0.6),
    rgba(196, 181, 253, 0)
  );
  filter: blur(4px);
  animation: pulse 4s ease-in-out infinite;
  transform: translateY(-30%);
}

.tracing-beam-dots {
  position: fixed;
  top: 0;
  left: 5%;
  height: 100%;
  width: 4px;
  z-index: 6;
  pointer-events: none;
}

.tracing-beam-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translateX(-4px);
  transition: all 0.5s ease;
}

.tracing-beam-dot.active {
  background: rgba(139, 92, 246, 0.9);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
  transform: translateX(-4px) scale(1.2);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .tracing-beam, .tracing-beam-dots {
    left: 2%;
  }
}
</style> 