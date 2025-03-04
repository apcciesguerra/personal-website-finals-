<template>
  <div 
    ref="container" 
    class="logo-cloud" 
    @mousemove="handleMouseMove" 
    @mouseenter="isHovering = true" 
    @mouseleave="isHovering = false"
  >
    <div 
      v-for="(logo, i) in logos" 
      :key="i" 
      class="logo-item" 
      :style="getLogoStyle(i)"
    >
      <img :src="logo.src" :alt="logo.alt" :style="{ opacity: logo.opacity || 1 }" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoCloudComponent',
  props: {
    logos: {
      type: Array,
      required: true,
      default: () => []
    },
    speed: {
      type: Number,
      default: 1
    },
    interactive: {
      type: Boolean,
      default: true
    },
    density: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      logoPositions: [],
      containerWidth: 0,
      containerHeight: 0,
      animationFrameId: null,
      mouseX: 0,
      mouseY: 0,
      isHovering: false
    };
  },
  mounted() {
    this.initializePositions();
    window.addEventListener('resize', this.handleResize);
    this.startAnimation();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  methods: {
    getLogoStyle(i) {
      if (!this.logoPositions[i]) return {};
      
      const pos = this.logoPositions[i];
      return {
        transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`,
        width: `${pos.size}px`,
        height: `${pos.size}px`
      };
    },
    initializePositions() {
      const container = this.$refs.container;
      this.containerWidth = container.clientWidth;
      this.containerHeight = container.clientHeight;
      
      // Initialize logo positions randomly within the container
      this.logoPositions = this.logos.map(() => {
        return {
          x: Math.random() * this.containerWidth,
          y: Math.random() * this.containerHeight,
          vx: (Math.random() - 0.5) * this.speed,
          vy: (Math.random() - 0.5) * this.speed,
          size: Math.random() * 30 + 40, // Random size between 40-70px
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5 * this.speed
        };
      });
    },
    handleResize() {
      const container = this.$refs.container;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      // Adjust logo positions based on new container size
      this.logoPositions.forEach(pos => {
        pos.x = (pos.x / this.containerWidth) * newWidth;
        pos.y = (pos.y / this.containerHeight) * newHeight;
      });
      
      this.containerWidth = newWidth;
      this.containerHeight = newHeight;
    },
    handleMouseMove(event) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    },
    startAnimation() {
      const animate = () => {
        // Update logo positions
        this.logoPositions.forEach((pos) => {
          // Apply mouse interaction if enabled and hovering
          if (this.interactive && this.isHovering) {
            const dx = this.mouseX - pos.x;
            const dy = this.mouseY - pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            
            if (distance < maxDistance) {
              // Repel logos from mouse
              const force = (1 - distance / maxDistance) * 2;
              pos.vx -= dx / distance * force;
              pos.vy -= dy / distance * force;
            }
          }
          
          // Apply velocity
          pos.x += pos.vx;
          pos.y += pos.vy;
          pos.rotation += pos.rotationSpeed;
          
          // Bounce off walls with some damping
          if (pos.x < 0 || pos.x > this.containerWidth) {
            pos.vx *= -0.8;
            pos.x = Math.max(0, Math.min(pos.x, this.containerWidth));
          }
          
          if (pos.y < 0 || pos.y > this.containerHeight) {
            pos.vy *= -0.8;
            pos.y = Math.max(0, Math.min(pos.y, this.containerHeight));
          }
          
          // Apply friction
          pos.vx *= 0.99;
          pos.vy *= 0.99;
          
          // Add some random movement
          pos.vx += (Math.random() - 0.5) * 0.1 * this.speed;
          pos.vy += (Math.random() - 0.5) * 0.1 * this.speed;
        });
        
        this.animationFrameId = requestAnimationFrame(animate);
      };
      
      this.animationFrameId = requestAnimationFrame(animate);
    }
  }
};
</script>

<style scoped>
.logo-cloud {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.logo-item {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  transition: opacity 0.3s ease;
}

.logo-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}
</style>
