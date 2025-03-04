<template>
  <div 
    class="interactive-grid-pattern"
    :style="patternStyle"
    @mousemove="handleMouseMove"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Configuration options
const props = defineProps({
  dotSize: {
    type: Number,
    default: 1
  },
  dotColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.3)'
  },
  dotSpacing: {
    type: Number,
    default: 20
  },
  interactiveRadius: {
    type: Number,
    default: 100
  },
  interactiveColor: {
    type: String,
    default: 'rgba(139, 92, 246, 0.8)'
  }
});

// State
const mousePosition = ref({ x: 0, y: 0 });
const isMouseInside = ref(false);

// Computed properties
const patternStyle = computed(() => {
  return {
    '--dot-size': `${props.dotSize}px`,
    '--dot-color': props.dotColor,
    '--dot-spacing': `${props.dotSpacing}px`,
    '--interactive-color': props.interactiveColor,
    '--mouse-x': `${mousePosition.value.x}px`,
    '--mouse-y': `${mousePosition.value.y}px`,
    '--interactive-radius': `${props.interactiveRadius}px`
  };
});

// Methods
const handleMouseMove = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

const handleMouseEnter = () => {
  isMouseInside.value = true;
};

const handleMouseLeave = () => {
  isMouseInside.value = false;
};

// Lifecycle hooks
onMounted(() => {
  const element = document.querySelector('.interactive-grid-pattern');
  if (element) {
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  }
});

onUnmounted(() => {
  const element = document.querySelector('.interactive-grid-pattern');
  if (element) {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<style scoped>
.interactive-grid-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: var(--dot-spacing) var(--dot-spacing);
  background-image: radial-gradient(
    circle at center,
    var(--dot-color) calc(var(--dot-size) / 2),
    transparent calc(var(--dot-size) / 2)
  );
  pointer-events: none;
  overflow: hidden;
}

.interactive-grid-pattern::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle var(--interactive-radius) at var(--mouse-x) var(--mouse-y),
    var(--interactive-color) 0%,
    transparent 100%
  );
  opacity: v-bind('isMouseInside ? 1 : 0');
  transition: opacity 0.3s ease;
  pointer-events: none;
}
</style>