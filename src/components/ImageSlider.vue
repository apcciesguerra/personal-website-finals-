<template>
    <div class="slider">
      <button class="slider-button" @click="nextSlide">NEXT</button>
      <img :src="images[currentSlide].src" :alt="'Slide ' + (currentSlide + 1)">
      <button class="slider-button" @click="prevSlide">PREVIOUS</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageSlider',
    data() {
      return {
        currentSlide: 0,
        images: [
          { src: require('@/assets/images/photo1.jpg') },
          { src: require('@/assets/images/photo2.jpg') },
          { src: require('@/assets/images/photo3.jpg') },
          { src: require('@/assets/images/photo4.jpg') },
          { src: require('@/assets/images/photo5.jpg') },
          { src: require('@/assets/images/photo6.jpg') },
          { src: require('@/assets/images/photo7.jpg') }
        ]
      }
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
      }
    }
  }
  </script>