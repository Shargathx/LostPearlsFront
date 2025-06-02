<template>
  <div>
    <modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">

      <template #body>
        <div class="container text-center">
          <div class="row justify-content-center">
            <div class="col">
              <h5>Lisa võtmesõna:</h5>
              <input type="text" class="form-control" id="keyword">
            </div>
          </div>
        </div>
      </template>

      <template #buttons>
        <button @click="executeAddKeyword" class="btn btn-success">Lisa</button>
      </template>

    </modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "AddKeywordModal",
  components: {Modal},
  props:{
    modalIsOpen: Boolean,
    //todo ei saa hästi aru
    keyword: Object

  },

  methods:{
    executeAddKeyword() {
      this.$emit('event-execute-add-keyword')
    },
  }
}
</script>
