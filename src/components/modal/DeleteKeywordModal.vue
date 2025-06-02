<template>
  <div>
    <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
      <template #body>
        <div class="container text-center">
          <div class="row justify-content-center">
            <div class="col">
              <h5>Oled kindel et soovid kustutada keywordi: </h5>
              <span>{{ keyword.keyword }}</span>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <button @click="executeDeleteKeyword" class="btn btn-success">Kustuta</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "DeleteKeywordModal",
  components: {Modal},
  props: {
    modalIsOpen: Boolean,
    //todo ei saa hästi aru
    keyword: Object

  },

  methods: {
    executeDeleteKeyword() {
      this.$emit('event-execute-delete-keyword')
    },
  }
}
</script>
