<template>
  <div class="gallery-container">
    <expandable-gallery :images="galleryImages" />
  </div>
</template>
  
<script>
import ExpandableGallery from './ui/ExpandableGallery.vue'

export default {
  name: 'ImageSlider',
  components: {
    ExpandableGallery
  },
  data() {
    return {
      galleryImages: [
        { 
          src: '/src/assets/images/photo1.jpg',
          title: 'Nature View',
          description: 'A beautiful landscape scene'
        },
        { 
          src: '/src/assets/images/photo2.jpg',
          title: 'Urban Life',
          description: 'City scenes and architecture'
        },
        { 
          src: '/src/assets/images/photo3.jpg',
          title: 'Adventure',
          description: 'Exploring new places'
        },
        { 
          src: '/src/assets/images/photo5.jpg',
          title: 'Relaxation',
          description: 'Peaceful moments'
        },
        { 
          src: '/src/assets/images/photo6.jpg',
          title: 'Memories',
          description: 'Capturing special moments'
        },
        { 
          src: '/src/assets/images/photo7.jpg',
          title: 'Inspiration',
          description: 'Finding beauty in everyday life'
        }
      ]
    }
  }
}
</script>

<style scoped>
.gallery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>
