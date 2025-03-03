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
          title: 'Vacation',
          description: 'Went to Baguio after a long time'
        },
        { 
          src: '/src/assets/images/photo2.jpg',
          title: 'Vacation #2',
          description: 'First time going to Boracay'
        },
        { 
          src: '/src/assets/images/photo3.jpg',
          title: 'Birthday',
          description: 'Celebrating my 18th Birthday'
        },
        { 
          src: '/src/assets/images/photo5.jpg',
          title: 'Family',
          description: 'Old Family Photo with my entire family'
        },
        { 
          src: '/src/assets/images/photo6.jpg',
          title: 'Memories',
          description: 'Photo of young me that I cant remember'
        },
        { 
          src: '/src/assets/images/photo7.jpg',
          title: 'Spider-man',
          description: 'THWIP-THWIP!'
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
