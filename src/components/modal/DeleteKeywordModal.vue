<template>
 <div>
   <modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">

     <template #body>
       <div class="container text-center">
         <div class="row justify-content-center">
           <div class="col">
             <h5>Oled kindel et soovid kustutada keywordi:
               <span style="font-weight: bold">{{keyword.keyword}}</span> </h5>
           </div>
         </div>
       </div>
     </template>

     <template #buttons>
       <button @click="executeDeleteKeyword" class="btn btn-success">Kustuta</button>
     </template>

   </modal>
 </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "DeleteKeywordModal",
  components: {Modal},
  props:{
    modalIsOpen: Boolean,
    //todo ei saa hästi aru
    keyword: Object

  },

  methods:{
    executeDeleteKeyword() {
      this.$emit('event-execute-delete-keyword')
    },
  }
}
</script>
