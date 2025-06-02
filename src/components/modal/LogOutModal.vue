<template>
  <div>
    <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">

      <template #title>
        <span>Are you sure you want to log out?</span>
      </template>

      <template #body>
      </template>

      <template #footer>
        <button class="btn btn-success me-4"
                @click="$emit('event-logout-confirmed');
                $emit('event-close-modal')">Jah
        </button>
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