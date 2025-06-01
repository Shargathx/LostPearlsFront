<template>
  <div @click="$emit('open-file-picker')" style="cursor: pointer">
    <img v-if=" imageData === null || imageData.length === 0" src="../../assets/AddLocationPlaceholderImage.png" class="img-thumbnail"/>
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
