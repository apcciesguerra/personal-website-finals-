<template>
  <div class="number-ticker">
    <div class="ticker-container" ref="tickerContainer">
      <div class="ticker-value">{{ displayValue }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberTicker',
  props: {
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 2000 // Duration in milliseconds
    },
    decimals: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      displayValue: '0', // Initialize as string instead of number
      startTime: null,
      startValue: 0,
      rafId: null,
      isVisible: false,
      observer: null
    }
  },
  watch: {
    value(newValue) {
      if (this.isVisible) {
        this.animateToValue(newValue);
      } else {
        this.displayValue = this.formatValue(newValue);
      }
    }
  },
  mounted() {
    // Initialize with formatted value
    this.displayValue = this.formatValue(this.value || 0);
    this.setupIntersectionObserver();
  },
  beforeUnmount() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isVisible) {
            this.isVisible = true;
            this.animateToValue(this.value);
          }
        });
      }, {
        threshold: 0.1
      });
      
      this.observer.observe(this.$refs.tickerContainer);
    },
    animateToValue(targetValue) {
      // Safely extract the number from displayValue whether it's a string or number
      let currentValue = 0;
      
      if (typeof this.displayValue === 'string') {
        // Extract numeric value from string, handling prefixes and suffixes
        currentValue = parseFloat(this.displayValue.replace(/[^\d.-]/g, '')) || 0;
      } else if (typeof this.displayValue === 'number') {
        currentValue = this.displayValue;
      }
      
      this.startValue = currentValue;
      this.startTime = null;
      
      const animate = (timestamp) => {
        if (!this.startTime) this.startTime = timestamp;
        const elapsed = timestamp - this.startTime;
        
        if (elapsed < this.duration) {
          // Easing function: easeOutExpo
          const progress = 1 - Math.pow(2, -10 * elapsed / this.duration);
          const currentValue = this.startValue + (targetValue - this.startValue) * progress;
          this.displayValue = this.formatValue(currentValue);
          
          this.rafId = requestAnimationFrame(animate);
        } else {
          this.displayValue = this.formatValue(targetValue);
        }
      };
      
      this.rafId = requestAnimationFrame(animate);
    },
    formatValue(value) {
      const formattedNumber = value.toFixed(this.decimals);
      return `${this.prefix}${formattedNumber}${this.suffix}`;
    }
  }
}
</script>

<style scoped>
.number-ticker {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.ticker-container {
  position: relative;
  display: inline-flex;
  overflow: hidden;
}

.ticker-value {
  display: inline-block;
  transform-origin: center;
  animation: pulse 1s ease-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
