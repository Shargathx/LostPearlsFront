<template>
  <div>
    <!--todo ei saa hästi aru vajadusest ja seostest-->
    <DeleteKeywordModal :modal-is-open="deleteKeywordModalIsOpen"
                        :keyword="keyword"
                        @event-execute-delete-keyword="executeDeleteKeyword"
                        @event-close-modal="closeDeleteKeywordModal"
    />

    <table class="table table-dark table-striped table-hover">
      <tbody>
      <tr v-for="keyword in keywords" :key="keyword.keywordId">
        <td>{{ keyword.keyword }}</td>
        <td>
          <font-awesome-icon
              @click="viewDeleteKeywordModal(keyword.keywordId)"
              class="cursor-pointer"
              icon="trash"
          />
        </td>

      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import KeywordService from "@/services/KeywordService";
import DeleteKeywordModal from "@/components/modal/DeleteKeywordModal.vue";
import Navigation from "@/navigation/Navigation";
import AddKeywordModal from "@/components/modal/AddKeywordModal.vue";

export default {
  name: "LocationKeywordsTable",
  components: {AddKeywordModal, DeleteKeywordModal, FontAwesomeIcon},
  props: {
    keywords: Array,
  },
  data() {
    return {
      keywordId: 0,
      deleteKeywordModalIsOpen: false,
      keyword: {
        locationId: 0,
        keyword: ""
      }
    }
  },

  methods: {

    viewDeleteKeywordModal(keywordId) {
      this.keywordId = keywordId;
      KeywordService.sendGetKeywordRequest(keywordId)
          .then(response => this.handleDeleteKeywordModalGetKeywordResponse(response))
          .catch(() => Navigation.navigateToErrorView())

    },

    handleDeleteKeywordModalGetKeywordResponse(response) {
      this.keyword = response.data
      this.deleteKeywordModalIsOpen = true
    },

    closeDeleteKeywordModal() {
      this.deleteKeywordModalIsOpen = false
    },


    executeDeleteKeyword() {
      KeywordService.sendDeleteKeywordRequest(this.keywordId)
          .then(() => {
            this.deleteKeywordModalIsOpen = false
            this.$emit('event-keyword-deleted')
          })
          .catch(() => Navigation.navigateToErrorView())
    },


  }
}
</script>


