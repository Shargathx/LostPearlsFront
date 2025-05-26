<template>
  <div>
    <img v-if=" imageData === null || imageData.length === 0" src="../../assets/558053230b37c6796e94c6df785887ab.jpg" class="img-thumbnail"/>
    <img v-else :src="imageData" class="img-thumbnail">
  </div>
</template>

<script>
export default {
  name: "LocationImage",
  props: {
    imageData: {
      type: String,
      default: ''
    }
  }
}
</script>
