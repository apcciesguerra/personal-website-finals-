<template>
  <div class="aurora-container">
    <div class="aurora-overlay">
      <div 
        v-for="(_, i) in Array(5)" 
        :key="i" 
        :class="[
          'aurora-blob',
          `aurora-blob-${i + 1}`
        ]"
      ></div>
    </div>
    <div class="aurora-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuroraBackground'
}
</script>

<style scoped>
.aurora-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.aurora-overlay {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.aurora-content {
  position: relative;
  z-index: 10;
  width: 100%;
}

.aurora-blob {
  position: absolute;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  mix-blend-mode: screen;
  filter: blur(80px);
  opacity: 0.7;
  animation: move 25s linear infinite;
  transform-origin: center;
}

.aurora-blob-1 {
  background: linear-gradient(to right, #4f46e5, #06b6d4);
  left: 0%;
  top: 10%;
  height: 400px;
  width: 400px;
  animation-delay: -2s;
}

.aurora-blob-2 {
  background: linear-gradient(to right, #8b5cf6, #d946ef);
  right: 0%;
  top: 20%;
  height: 350px;
  width: 350px;
  animation-delay: -5s;
}

.aurora-blob-3 {
  background: linear-gradient(to right, #ec4899, #f43f5e);
  left: 20%;
  bottom: 20%;
  height: 300px;
  width: 300px;
  animation-delay: -8s;
}

.aurora-blob-4 {
  background: linear-gradient(to right, #14b8a6, #84cc16);
  right: 20%;
  bottom: 10%;
  height: 450px;
  width: 450px;
  animation-delay: -11s;
}

.aurora-blob-5 {
  background: linear-gradient(to right, #f97316, #eab308);
  left: 40%;
  top: 40%;
  height: 500px;
  width: 500px;
  animation-delay: -14s;
}

@keyframes move {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(10%, 10%) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(5%, -5%) rotate(180deg) scale(1);
  }
  75% {
    transform: translate(-10%, 5%) rotate(270deg) scale(0.9);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}
</style>
