<template>
  <div class="hyper-text-container">
    <div class="hyper-text" ref="hyperTextRef">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HyperText',
  props: {
    speed: {
      type: Number,
      default: 0.5
    },
    intensity: {
      type: Number,
      default: 0.3
    },
    color: {
      type: String,
      default: 'rgba(139, 92, 246, 0.8)' // Purple color matching the site theme
    }
  },
  mounted() {
    this.setupHyperText();
    window.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    setupHyperText() {
      // Add the initial styling
      const element = this.$refs.hyperTextRef;
      if (!element) return;
      
      // Set initial text shadow
      this.updateTextShadow(element, 0, 0);
    },
    handleMouseMove(event) {
      const element = this.$refs.hyperTextRef;
      if (!element) return;
      
      // Get element position
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to element center
      const distanceX = (event.clientX - elementCenterX) * this.speed;
      const distanceY = (event.clientY - elementCenterY) * this.speed;
      
      // Update text shadow based on mouse position
      this.updateTextShadow(element, distanceX, distanceY);
    },
    updateTextShadow(element, offsetX, offsetY) {
      // Calculate shadow intensity based on distance
      const intensity = this.intensity;
      const maxOffset = Math.max(Math.abs(offsetX), Math.abs(offsetY));
      const normalizedIntensity = Math.min(maxOffset / 500, 1) * intensity;
      
      // Create dynamic text shadow
      element.style.textShadow = `
        ${offsetX * 0.05}px ${offsetY * 0.05}px ${5 + normalizedIntensity * 15}px ${this.color},
        ${-offsetX * 0.02}px ${-offsetY * 0.02}px ${2 + normalizedIntensity * 5}px rgba(255, 255, 255, 0.5)
      `;
      
      // Add subtle rotation and scale for more dynamic effect
      const rotateAmount = Math.max(-1, Math.min(1, offsetX / 1000)) * 0.5;
      const scaleAmount = 1 + normalizedIntensity * 0.05;
      
      element.style.transform = `
        rotate(${rotateAmount}deg)
        scale(${scaleAmount})
      `;
    }
  }
}
</script>

<style scoped>
.hyper-text-container {
  display: inline-block;
  overflow: visible;
}

.hyper-text {
  position: relative;
  display: inline-block;
  transition: text-shadow 0.2s ease-out, transform 0.2s ease-out;
  will-change: text-shadow, transform;
  color: white;
  font-weight: 700;
}
</style>
