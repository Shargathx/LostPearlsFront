<template>
  <div v-if="errorMessage !== null &&  errorMessage.length > 0" class="alert alert-warning mx-auto text-center" style="max-width: 350px" role="alert">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  username: 'AlertDanger',
  props: {
    errorMessage: String
  }
}
</script>


<style scoped>
.alert-custom {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
}
</style>