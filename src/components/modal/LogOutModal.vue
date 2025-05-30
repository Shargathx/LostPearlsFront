<template>
  <div>
    <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">

      <template #title>
        <span>Are you sure you want to log out?</span>
      </template>

      <template #body>
      </template>

      <template #footer>
        <button @click="$emit('event-logout-confirmed')" class="btn btn-success mb-5 me-4">Jah</button>
      </template>

    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'LogOutModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  }
}
</script>

<style>



</style>