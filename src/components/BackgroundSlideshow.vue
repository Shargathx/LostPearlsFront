<template>
  <div class="slideshow-container">
    <transition-group name="fade" tag="div">
      <div
          v-for="(image, index) in [currentImage]"
          :key="index"
          class="slideshow-slide"
          :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </transition-group>
    <div class="black-overlay" :class="{ active: isFading }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('@/assets/backgroundloops/austria-6398889_1920.jpg'),
        require('@/assets/backgroundloops/beach-8262340_1920.jpg'),
        require('@/assets/backgroundloops/factory-3337207_1920.jpg')
      ],
      currentIndex: 0,
      isFading: false,
      intervalId: null
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.isFading = false;
      }, 3000); // Black fade duration
    }, 8000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

<style scoped>
.slideshow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.slideshow-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(2px); /* Small blur */
  transition: opacity 3s ease-in-out;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Black overlay that fades in during transition */
.black-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  transition: opacity 3s ease-in-out;
  pointer-events: none;
  z-index: 1;
}

.black-overlay.active {
  opacity: 1;
}
</style>
