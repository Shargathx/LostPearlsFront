<template>
  <section class="initiate-games">
    <h2>Start a New Game</h2>

    <div class="game-fields justify-content-center">
      <button v-for="(field, index) in initiateFields" :key="index"
              class="game-field"
              @click="openAddLocation(index)"
              :class="{ 'empty-slot': !field.name && field.county }">

        <div class="thumbnail">
          <img
              :src="field.imageData || placeholderImage"
              @error="onImageError($event)"
              alt="image"/>

          <div class="plus-overlay" v-if="!field.name && !field.county">+</div>

        </div>
        <div class="info">
          <p><strong>Name:</strong> {{ field.name || 'Click to add' }}</p>
          <p><strong>County:</strong> {{ field.county || 'Click to add' }}</p>
        </div>
      </button>
    </div>

    <AddGameModal
        :modal-is-open="modalIsOpen"
        :counties="counties"
        @game-added="handleGameAdded"
        @close="modalIsOpen = false"/>

  </section>
</template>

<script>
import AddGameModal from "@/components/modal/AddGameModal.vue";

export default {
  name: "GameFields",
  components: {AddGameModal},

  props: {
    counties: {
      type: Array,
      default: () => []
    },

    playedGames: {
      type: Array,
      default: () => []
    }
  },


  data() {
    return {

      modalIsOpen: false,
      selectedFieldIndex: null,
      placeholderImage: "https://cdn3.emoji.gg/emojis/82146-skulltoppray.png",
      initiateFields: [],
    };
  },

  created() {
    this.fillInitiateFields();
  },

  methods: {

    fillInitiateFields() {
      if (!Array.isArray(this.playedGames)) {
        this.initiateFields = [
          {name: "", county: "", imageData: ""},
          {name: "", county: "", imageData: ""},
          {name: "", county: "", imageData: ""},
        ];
        return;
      }

      this.initiateFields = this.playedGames.map(game => ({
        name: game.locationName,
        county: game.countyName,
        imageData: game.image || "",
      }));

      while (this.initiateFields.length < 3) {
        this.initiateFields.push({name: "", county: "", imageData: ""});
      }
    },


    openAddLocation(index) {
      console.log("openAddLocation called for index", index);
      this.selectedFieldIndex = index;
      this.modalIsOpen = true;
    },

    handleGameAdded(game) {
      console.log("Game added event received:", game);
      if (this.selectedFieldIndex !== null) {
        this.initiateFields[this.selectedFieldIndex] = {
          name: game.locationName,
          county: game.countyName,
          imageData: game.image,
        };
      }
      this.modalIsOpen = false;
      this.selectedFieldIndex = null;
    },

    onImageError(event) {
      event.target.src = this.placeholderImage;
    },
  },

  watch: {
    playedGames: {
      immediate: true,
      handler() {
        this.fillInitiateFields();
      }
    }
  }
}


</script>

<style scoped>

</style>
