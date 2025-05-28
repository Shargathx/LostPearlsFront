<template>
  <div>
    <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">

      <template #title>
        <span>Are you sure you want to log out?</span>
      </template>

      <template #body>
        <img class="img-thumbnail" width="300" src="https://assets-v2.lottiefiles.com/a/8b482bde-116c-11ee-b205-3bbacd4e17cc/sw6Exiwa6c.gif" alt="gif nooleke välja">
      </template>

      <template #buttons>
        <button @click="$emit('event-logout-confirmed')" class="btn btn-success">Jah</button>
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