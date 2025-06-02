<template>
  <div>
    <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">

      <template #title>
        <span>Add keyword</span>
      </template>


      <template #body>
        <div class="container text-center">
          <div class="row justify-content-center">
            <div class="col col-5">
              <input v-model="newKeyword" type="text" class="form-control">
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <button @click="executeAddKeyword" class="btn btn-success">Lisa</button>
      </template>

    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "AddKeywordModal",
  components: {Modal},
  props:{
    modalIsOpen: Boolean

  },
  data() {
    return {
      newKeyword: ''
    }
  },

  methods:{
    executeAddKeyword() {
      this.$emit('event-execute-add-keyword', this.newKeyword)
      this.newKeyword = ''
    },
  }
}
</script>
