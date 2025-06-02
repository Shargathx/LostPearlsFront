<template>
  <div>
    <!--todo ei saa hästi aru vajadusest ja seostest-->
    <DeleteKeywordModal :modal-is-open="deleteKeywordModalIsOpen"
                        :keyword="keyword"
                        @event-execute-delete-keyword="executeDeleteKeyword"
                        @event-close-modal="closeDeleteKeywordModal"
    />

    <AddKeywordModal :modal-is-open="addKeywordModalIsOpen"
                     :keyword="keyword"
                     @event-execute-add-keyword="executeAddKeyword"
                     @event-close-modal="closeAddKeywordModal"
    />

    <table class="table table-dark table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">
          <button @click="viewAddKeywordModal()">ADD KEYWORDS</button>
        </th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="keyword in keywords" :key="keyword.keywordId">
        <td>{{ keyword.keyword }}</td>
        <td>


          <font-awesome-icon
              @click="viewDeleteKeywordModal(keyword.keywordId)"
              class="cursor-pointer"
              icon="minus"
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
    locationId: Number
  },
  data() {
    return {
      keywordId: 0,
      deleteKeywordModalIsOpen: false,
      addKeywordModalIsOpen: false,
      keyword: {
        locationId: 0,
        keyword: ""
      }
    }
  },

  methods: {
    //todo

    closeDeleteKeywordModal() {
      this.deleteKeywordModalIsOpen = false
    },

    closeAddKeywordModal() {
      this.addKeywordModalIsOpen = false
    },

    viewDeleteKeywordModal(keywordId) {
      this.keywordId = keywordId;
      KeywordService.sendGetKeywordRequest(keywordId)
          .then(response => this.handleDeleteKeywordModalGetKeywordResponse(response))
          .catch(() => Navigation.navigateToErrorView())

    },

    viewAddKeywordModal() {
      this.addKeywordModalIsOpen = true


    },

    adsadas() {
      KeywordService.sendAddKeywordRequest(this.keyword)
          .then(response => this.handleAddKeywordModalGetKeywordResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleDeleteKeywordModalGetKeywordResponse(response) {
      this.keyword = response.data
      this.deleteKeywordModalIsOpen = true
    },

    handleAddKeywordModalGetKeywordResponse(response) {
      this.keyword = response.data
      this.addKeywordModalIsOpen = true
    },


    executeDeleteKeyword() {
      KeywordService.sendDeleteKeywordRequest(this.keywordId)
          .then(() => {
            this.deleteKeywordModalIsOpen = false
            this.$emit('event-keyword-deleted')
          })
          .catch(() => Navigation.navigateToErrorView())
    },

    executeAddKeyword() {
      KeywordService.sendAddKeywordRequest(this.keyword)
          .then(() => {
            this.addKeywordModalIsOpen = false
            this.$emit('event-keyword-added')
          })
          .catch(() => Navigation.navigateToErrorView())
    },


  }
}
</script>


