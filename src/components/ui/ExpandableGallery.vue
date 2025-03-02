<template>
  <div class="expandable-gallery">
    <div 
      v-for="(image, index) in images" 
      :key="index"
      class="gallery-item"
      :style="{ backgroundImage: `url(${image.src})` }"
    >
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
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  height: 500px;
  border-radius: 0.75rem;
  overflow: hidden;
}

.gallery-item {
  flex: 1;
  min-width: 150px;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.5s cubic-bezier(0.25, 0.4, 0.45, 1.4);
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
}

.gallery-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover {
  flex: 3;
}

.gallery-item:hover::before {
  opacity: 1;
}

.gallery-item-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.4s ease;
}

.gallery-item:hover .gallery-item-content {
  transform: translateY(0);
}

.gallery-item-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.gallery-item-content p {
  font-size: 0.875rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .expandable-gallery {
    height: auto;
    flex-direction: column;
  }
  
  .gallery-item {
    height: 200px;
  }
  
  .gallery-item:hover {
    flex: 1;
    height: 300px;
  }
}
</style> 