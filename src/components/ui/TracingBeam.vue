<template>
  <div class="tracing-beam-container">
    <div class="tracing-beam-content">
      <slot></slot>
    </div>
    <div class="tracing-beam" ref="tracingBeam">
      <div class="tracing-beam-gradient" ref="beamGradient"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TracingBeam',
  data() {
    return {
      sections: [],
      observer: null,
      lastScrollPos: 0,
      isScrolling: false,
      scrollTimeout: null
    }
  },
  mounted() {
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
    
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
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
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
            // Enhance beam glow when a new section comes into view
            this.pulseBeamGlow();
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
      const beamGradient = this.$refs.beamGradient;
      if (!tracingBeam || !beamGradient) return;

      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;

      // Update the beam height based on scroll progress
      const beamHeight = Math.max(scrollProgress * 100, 5); // Minimum 5% height
      tracingBeam.style.height = `${beamHeight}%`;

      // Update gradient position for a more dynamic effect
      const gradientPos = Math.min(scrollProgress * 200, 100);
      beamGradient.style.top = `${gradientPos}%`;

      // Detect scroll speed
      const scrollSpeed = Math.abs(scrollTop - this.lastScrollPos);
      this.lastScrollPos = scrollTop;

      // Add active class when scrolling
      if (scrollSpeed > 5) {
        this.isScrolling = true;
        beamGradient.classList.add('active');
        
        // Clear any existing timeout
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        
        // Set timeout to remove active class after scrolling stops
        this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false;
          beamGradient.classList.remove('active');
        }, 1000);
      }
    },
    pulseBeamGlow() {
      const beamGradient = this.$refs.beamGradient;
      if (!beamGradient) return;
      
      // Add and remove pulse class to trigger animation
      beamGradient.classList.add('pulse');
      setTimeout(() => {
        beamGradient.classList.remove('pulse');
      }, 1000);
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
  animation: subtle-pulse 4s ease-in-out infinite;
  transform: translateY(-30%);
  transition: filter 0.5s ease, opacity 0.5s ease;
}

.tracing-beam-gradient.active {
  filter: blur(6px) brightness(1.5);
  animation: active-pulse 1.5s ease-in-out infinite;
}

.tracing-beam-gradient.pulse {
  animation: intense-pulse 1s ease-out;
}

@keyframes subtle-pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes active-pulse {
  0%, 100% {
    opacity: 0.9;
    filter: blur(6px) brightness(1.5);
  }
  50% {
    opacity: 0.7;
    filter: blur(4px) brightness(1.2);
  }
}

@keyframes intense-pulse {
  0% {
    opacity: 1;
    filter: blur(8px) brightness(2);
  }
  100% {
    opacity: 0.8;
    filter: blur(4px) brightness(1.5);
  }
}

@media (max-width: 768px) {
  .tracing-beam {
    left: 2%;
  }
}
</style>
