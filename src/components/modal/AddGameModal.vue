<template>
  <div v-if="modalIsOpen" class="modal-overlay">
    <div class="modal-content">
      <h3>Select County</h3>

      <CountiesDropdown
          :counties="counties"
          @event-new-county-selected="selectedCounty = $event"
      />

      <div class="modal-buttons">
        <button @click="$emit('close')" class="btn btn-warning">Cancel</button>
        <button
            @click="submit"
            :disabled="!selectedCounty || loading"
            class="btn-submit"
        >
          {{ loading ? "Submitting..." : "Submit" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CountiesDropdown from "@/county/CountiesDropdown.vue";
import GameService from "@/services/GameService";

export default {
  name: "AddGameModal",
  components: { CountiesDropdown },
  props: {
    counties: Array,
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["game-added", "close", "games-updated"],
  data() {
    return {
      selectedCounty: null,
      loading: false,
      userId: 0,
    };
  },
  methods: {
    submit() {
      if (!this.selectedCounty) return;
      this.loading = true;

      const userId = Number(sessionStorage.getItem('userId'));

      GameService.sendPostGameRequest(this.selectedCounty, userId)
          .then((response) => {
            this.$emit("event-game-added");
            this.loading = false;
          })

          .catch((error) => {
            console.error("Failed to submit or fetch games:", error);
            this.loading = false;
          });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 1.25rem 1.5rem;
  border-radius: 0.5rem;
  width: 320px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.2);
  text-align: center;
}

h3 {
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: #222;
}

.modal-buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

button {
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-cancel {
  background: transparent;
  color: #555;
}

.btn-cancel:hover {
  color: #000;
}

.btn-submit {
  background: #007bff;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #0056b3;
}
</style>
