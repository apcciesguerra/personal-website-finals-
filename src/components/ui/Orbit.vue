<template>
  <div class="orbit-container" ref="container" @mousemove="handleMouseMove">
    <div class="orbit-center" :style="centerStyle">
      <slot name="center">
        <div class="default-center"></div>
      </slot>
    </div>
    
    <div class="orbit-path" :style="pathStyle"></div>
    
    <div 
      v-for="(item, index) in orbitItems" 
      :key="index"
      class="orbit-item"
      :style="getItemStyle(item)"
      @mouseenter="item.hover = true"
      @mouseleave="item.hover = false"
    >
      <div class="orbit-item-content" :style="{ background: item.color || '#8B5CF6' }">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrbitComponent',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    radius: {
      type: Number,
      default: 150
    },
    speed: {
      type: Number,
      default: 10
    },
    interactive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      orbitItems: [],
      centerX: 0,
      centerY: 0,
      containerWidth: 0,
      containerHeight: 0,
      mouseX: 0,
      mouseY: 0,
      animationFrameId: null
    };
  },
  computed: {
    centerStyle() {
      return {
        left: `${this.centerX}px`,
        top: `${this.centerY}px`
      };
    },
    pathStyle() {
      return {
        width: `${this.radius * 2}px`,
        height: `${this.radius * 2}px`,
        left: `${this.centerX - this.radius}px`,
        top: `${this.centerY - this.radius}px`
      };
    }
  },
  mounted() {
    this.initializeItems();
    this.updateContainerDimensions();
    window.addEventListener('resize', this.updateContainerDimensions);
    this.startAnimation();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerDimensions);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  methods: {
    initializeItems() {
      // Create a copy of items with additional properties for animation
      this.orbitItems = this.items.map((item, index) => {
        const angle = (index / this.items.length) * 360;
        return {
          ...item,
          angle,
          speed: this.speed * (0.8 + Math.random() * 0.4), // Slight variation in speed
          hover: false,
          size: item.size || 50
        };
      });
    },
    updateContainerDimensions() {
      const container = this.$refs.container;
      if (!container) return; // Add null check
      
      this.containerWidth = container.clientWidth;
      this.containerHeight = container.clientHeight;
      
      // Center the orbit in the container
      this.centerX = this.containerWidth / 2;
      this.centerY = this.containerHeight / 2;
    },
    getItemStyle(item) {
      // Calculate position based on angle
      const x = this.centerX + Math.cos(item.angle * (Math.PI / 180)) * this.radius;
      const y = this.centerY + Math.sin(item.angle * (Math.PI / 180)) * this.radius;
      
      // Scale up slightly on hover
      const scale = item.hover ? 1.2 : 1;
      
      return {
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        zIndex: item.hover ? 10 : 1
      };
    },
    handleMouseMove(event) {
      const container = this.$refs.container;
      if (!container) return; // Add null check
      
      const rect = container.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    },
    startAnimation() {
      const animate = () => {
        // Update each item's position
        this.orbitItems.forEach(item => {
          // Base rotation speed
          let rotationSpeed = item.speed / 100;
          
          // Apply interactive effects if mouse is in the container
          if (this.interactive && this.mouseX && this.mouseY) {
            const dx = this.mouseX - this.centerX;
            const dy = this.mouseY - this.centerY;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate angle between mouse and center
            const mouseAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // Slow down rotation when mouse is near the orbit path
            if (Math.abs(distanceFromCenter - this.radius) < 50) {
              rotationSpeed *= 0.2;
              
              // Add attraction/repulsion based on mouse position
              const angleDiff = ((mouseAngle - item.angle + 180) % 360) - 180;
              
              // Items are attracted to the mouse position
              if (Math.abs(angleDiff) < 45) {
                rotationSpeed += (45 - Math.abs(angleDiff)) / 45 * 0.05;
              }
            }
          }
          
          // Update angle
          item.angle = (item.angle + rotationSpeed) % 360;
        });
        
        this.animationFrameId = requestAnimationFrame(animate);
      };
      
      this.animationFrameId = requestAnimationFrame(animate);
    }
  }
};
</script>

<style scoped>
.orbit-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.orbit-center {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.default-center {
  width: 20px;
  height: 20px;
  background: rgba(139, 92, 246, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}

.orbit-path {
  position: absolute;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  pointer-events: none;
}

.orbit-item {
  position: absolute;
  transform-origin: center;
  transition: transform 0.2s ease-out;
  cursor: pointer;
}

.orbit-item-content {
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.orbit-item:hover .orbit-item-content {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}
</style>
