<template>
 <div>
   <modal :modal-is-open="modalIsOpen">

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

  }
}
</script>
