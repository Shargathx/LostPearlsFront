<template>
  <div class="mb-3">
    <input class="form-control" type="file" ref="file-input" @change="handleImage" accept="image/x-png,image/jpeg,image/gif">
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  data() {
    return {
      imageDataBase64: String
    }
  },
  methods: {
    handleImage(event) {
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    openFilePicker() {
      this.$refs["file-input"].click();
    },

    emitBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataBase64 = reader.result;
        this.$emit('event-new-image-selected', this.imageDataBase64)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    }
  }
}
</script>