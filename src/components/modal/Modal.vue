<template>
  <div>
    <!-- Modal -->
    <div v-if="modalIsOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header mt-4">
            <h1 class="modal-title fs-5">
              <slot name="title"></slot>
            </h1>
            <button type="button" class="btn-close me-4" @click="$emit('event-close-modal')" aria-label="Close"/>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-secondary me-2 mb-5" @click="$emit('event-close-modal')">Sulge</button>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalIsOpen: Boolean
  }
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden; /* crop blurred bg */
  max-width: 500px;
  width: 90%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  position: relative; /* already set */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-height: 60px;
  text-align: center;
}

.btn-close {
  position: absolute;
  right: 1rem; /* adjust if needed */
  top: 50%;
  transform: translateY(-50%);
}

.modal-footer {
  display: flex;
  justify-content: center; /* center all buttons */
  gap: 0.5rem; /* smaller gap between buttons */
  padding: 1rem;
}

.modal-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/cave-torch-explorer-stockcake.jpg') no-repeat center 30%;
  background-size: cover;
  filter: blur(2px);
  z-index: 0;
  border-radius: 20px;
}

.modal-container::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 20px;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal-content {
  position: relative;
  z-index: 1; /* to be above the blurred background */
  padding: 10px;
}

.modal-title span {
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7); /* optional, for better readability */
}


</style>