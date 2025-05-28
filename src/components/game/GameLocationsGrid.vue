<template>
  <div class="locations-grid">
    <div
        v-for="(location, index) in locations"
        :key="index"
        class="location-card"
        @click="handleLocationClick(index)">

      <div class="thumbnail">
        <!-- Placeholder for thumbnail image or map snapshot -->
        <img
            v-if="location.thumbnailUrl"
            :src="location.thumbnailUrl"
            alt="Location Thumbnail"
        />
        <div v-else class="thumbnail-placeholder">No Image</div>
      </div>
      <div class="location-info">
        <h3>{{ location.locationName || "Location Name" }}</h3>
        <p>{{ location.countyName || "County Name" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameLocationsGrid",
  data() {
    return {
      locations: [], // Will be filled with data from GET
    };
  },


  methods: {
    handleLocationClick(index) {
      // Placeholder: emit event or open modal to add/edit location
      this.$emit("location-selected", index);
    }
    ,

    // This method can be called later to load real location data
    updateLocationData(index, data) {
      if (index >= 0 && index < this.locations.length) {
        this.locations[index] = {...this.locations[index], ...data};
      }
    }
    ,
  }
  ,
};
</script>

<style scoped>
.locations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.location-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s ease;
}

.location-card:hover {
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
}

.thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9; /* Keeps a nice rectangular ratio */
  border-radius: 12px;
  background-color: #ddd;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-placeholder {
  color: #777;
  font-size: 0.9rem;
}

.location-info {
  margin-top: 0.5rem;
  text-align: center;
}

.location-info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.location-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}
</style>
