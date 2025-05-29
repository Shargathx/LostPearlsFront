<template>
  <section class="initiate-games">
    <h2>Start a New Game</h2>

    <div class="game-fields justify-content-center">
      <button
          v-for="(field, index) in initiateFields"
          :key="index"
          class="game-field"
          @click="openAddLocation(index)"
          :class="{ 'empty-slot': !field.name && !field.county }">

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

    <!-- Modal: Add Game -->
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
    }
  },


  data() {
    return {

      modalIsOpen: false,
      selectedFieldIndex: null,
      placeholderImage: "https://cdn3.emoji.gg/emojis/82146-skulltoppray.png",
      initiateFields: [
        {name: "", county: "", imageData: ""},
        {name: "", county: "", imageData: ""},
        {name: "", county: "", imageData: ""},
      ],
    };
  },

  methods: {
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


};
</script>

<style scoped>
.initiate-games {
  padding: 20px;
}

.game-fields {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.game-field {
  background: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 200px;
  text-align: left;
  cursor: pointer;
  padding: 10px;
  position: relative;
  transition: border-color 0.3s;
}

.game-field:hover {
  border-color: #888;
}

.thumbnail {
  position: relative;
  width: 100%;
  height: auto;
}

.thumbnail img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}

.plus-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  display: none; /* hidden by default */
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #444;
  font-weight: bold;
  border-radius: 4px;
}


.empty-slot:hover .plus-overlay {
  display: flex; /* show only on hover */
  background-color: rgba(255, 255, 255, 0.8);
}

.info {
  margin-top: 10px;
}
</style>
