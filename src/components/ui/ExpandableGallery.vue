<template>
  <div class="expandable-gallery">
    <div 
      v-for="(image, index) in images" 
      :key="index"
      class="gallery-item"
      :style="{ backgroundImage: `url(${image.src})` }"
    >
      <div class="gallery-item-overlay"></div>
      <div class="gallery-item-content">
        <h3>{{ image.title }}</h3>
        <p>{{ image.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpandableGallery',
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.expandable-gallery {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 500px;
  border-radius: 1rem;
  overflow: hidden;
  padding: 0.5rem;
  background: rgba(15, 15, 25, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.gallery-item {
  flex: 1;
  min-width: 60px;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.7s cubic-bezier(0.25, 0.4, 0.45, 1.4);
  overflow: hidden;
  border-radius: 0.75rem;
  cursor: pointer;
  margin: 0 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  will-change: flex;
}

.gallery-item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.5) 30%,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
}

.gallery-item:hover {
  flex: 5;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10;
  transform: scale(1.02);
}

.expandable-gallery:hover .gallery-item:not(:hover) {
  flex: 0.5;
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.gallery-item-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  z-index: 2;
}

.gallery-item:hover .gallery-item-content {
  transform: translateY(0);
}

.gallery-item-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.1s;
}

.gallery-item-content p {
  font-size: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.2s;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  max-width: 90%;
}

.gallery-item:hover .gallery-item-content h3,
.gallery-item:hover .gallery-item-content p {
  opacity: 1;
  transform: translateY(0);
}

/* Add a subtle shine effect on hover */
.gallery-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform: skewX(-25deg);
  transition: all 0.75s ease;
  opacity: 0;
}

.gallery-item:hover::after {
  left: 150%;
  opacity: 0.8;
  transition: all 1.5s ease;
}

@media (max-width: 768px) {
  .expandable-gallery {
    height: auto;
    flex-direction: column;
    padding: 0.5rem;
  }
  
  .gallery-item {
    height: 100px;
    margin: 0.25rem 0;
    flex: 1;
    min-width: 100%;
  }
  
  .gallery-item:hover {
    flex: 1;
    height: 300px;
  }
  
  .expandable-gallery:hover .gallery-item:not(:hover) {
    flex: 1;
  }
  
  .gallery-item-content {
    padding: 1.5rem;
  }
  
  .gallery-item-content h3 {
    font-size: 1.25rem;
  }
  
  .gallery-item-content p {
    font-size: 0.875rem;
  }
}
</style>
