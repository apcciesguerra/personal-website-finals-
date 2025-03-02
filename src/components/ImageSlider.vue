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
          src: require('@/assets/images/photo1.jpg'),
          title: 'Nature View',
          description: 'A beautiful landscape scene'
        },
        { 
          src: require('@/assets/images/photo2.jpg'),
          title: 'Urban Life',
          description: 'City scenes and architecture'
        },
        { 
          src: require('@/assets/images/photo3.jpg'),
          title: 'Adventure',
          description: 'Exploring new places'
        },
        { 
          src: require('@/assets/images/photo5.jpg'),
          title: 'Relaxation',
          description: 'Peaceful moments'
        },
        { 
          src: require('@/assets/images/photo6.jpg'),
          title: 'Memories',
          description: 'Capturing special moments'
        },
        { 
          src: require('@/assets/images/photo7.jpg'),
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