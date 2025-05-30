<template>
  <div v-if="modalIsOpen" class="modal-overlay">
    <div class="modal-content">
      <h3>Select County</h3>

      <CountiesDropdown
          :counties="counties"
          @event-new-county-selected="selectedCounty = $event"/>

      <div class="modal-buttons">
        <button @click="$emit('close')">Cancel</button>
        <button @click="submit" :disabled="!selectedCounty || loading">
          {{ loading ? "Submitting..." : "Submit" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CountiesDropdown from "@/county/CountiesDropdown.vue";
import LocationService from "@/services/LocationService";
import GameService from "@/services/GameService";

export default {
  name: "AddGameModal",
  components: {CountiesDropdown},
  props: {
    counties: Array,

    modalIsOpen: {
      type: Boolean,
      required: true
    },

  },

  emits: ["game-added", "close"],


  data() {
    return {
      selectedCounty: null,
      loading: false,
      userId: 0,
    };
  },


  methods: {
    cancel() {
      this.$emit("close");
    },
    submit() {
      if (!this.selectedCounty) return;
      this.loading = true;

      const userId = this.userId || 1;

      GameService.sendPostGameRequest(this.selectedCounty, userId)
          .then(response => {
            const locationData = response.data;

            const selectedCountyObj = this.counties.find(
                county => county.countyId === this.selectedCounty
            );

            this.$emit("game-added", {
              locationName: locationData.locationName || "Unknown Location",
              countyName: selectedCountyObj ? selectedCountyObj.countyName : "Unknown County",
              image: locationData.image || "",
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              dateAdded: locationData.dateAdded
            });

            return GameService.getUserGamesInProgress(userId);
          })
          .then(gamesResponse => {
            this.$emit("games-updated", gamesResponse.data);
            this.loading = false;
            this.$emit("close");
          })
          .catch(error => {
            console.error("Failed to submit or fetch games:", error);
            this.loading = false;
          });
    }


  },
}


</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
