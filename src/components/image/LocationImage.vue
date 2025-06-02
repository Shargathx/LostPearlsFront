<template>
  <div class="mb-3">
    <img v-if="  imageData === null || imageData.length === 0" src="../../assets/backgroundloops/empty_thumbnail.jpg"
         class="img-thumbnail" alt="Tühja pildi default fill">
    <img v-else :src="imageData" class="img-thumbnail" alt="Uploaded picture/foto of the location">
  </div>
</template>

<script>

export default {
  name: "locationImage",
  props: {
    imageData: {
      type: String,
      default: ""
    }
  }
}

</script>



<style scoped>

</style>