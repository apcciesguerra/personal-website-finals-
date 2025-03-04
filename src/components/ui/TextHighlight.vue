<template>
  <div class="text-highlight-container">
    <span 
      class="text-highlight" 
      :class="{ 'highlight-active': isActive }"
      ref="highlightRef"
    >
      <slot></slot>
      <span class="highlight-bg" :style="highlightStyle"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextHighlight',
  props: {
    color: {
      type: String,
      default: 'rgba(139, 92, 246, 0.3)' // Default purple matching site theme
    },
    activeColor: {
      type: String,
      default: 'rgba(139, 92, 246, 0.6)' // Brighter purple for active state
    },
    animated: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 1.5 // seconds
    },
    delay: {
      type: Number,
      default: 0 // seconds
    }
  },
  data() {
    return {
      isActive: false,
      observer: null
    }
  },
  computed: {
    highlightStyle() {
      return {
        backgroundColor: this.isActive ? this.activeColor : this.color,
        transitionDuration: `${this.duration}s`,
        transitionDelay: `${this.delay}s`
      }
    }
  },
  mounted() {
    if (this.animated) {
      this.setupIntersectionObserver();
    } else {
      this.isActive = true;
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isActive) {
            this.isActive = true;
            // Once activated, no need to observe anymore
            this.observer.disconnect();
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
      });
      
      this.observer.observe(this.$refs.highlightRef);
    }
  }
}
</script>

<style scoped>
.text-highlight-container {
  display: inline-block;
}

.text-highlight {
  position: relative;
  display: inline-block;
  color: inherit;
  z-index: 1;
}

.highlight-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  z-index: -1;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: transform var(--duration, 1.5s) cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
  border-radius: 2px;
}

.highlight-active .highlight-bg {
  transform: scaleY(1);
}
</style>
