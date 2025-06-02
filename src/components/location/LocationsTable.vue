<template>
  <div class="table-wrapper">
    <table class="table table-striped table-hover table-bordered w-100">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">County</th>
        <th scope="col">Description</th>
        <th scope="col">Date added</th>
        <th scope="col">Location</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="userLocation in userLocations" :key="userLocation.locationId">
        <td class="p-2">{{ userLocation.locationName }}</td>
        <td class="p-2">{{ userLocation.countyName }}</td>
        <td class="p-2">{{ userLocation.teaser }}</td>
        <td class="p-2">{{ userLocation.dateAdded }}</td>
        <td>
          <button
              class="btn btn-info me-1 ms-1"
              @click="navigateToLocationView(userLocation.locationId)"
          >
            Go to
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Navigation from "@/navigation/Navigation";

export default {
  name: "LocationsTable",
  props: {
    userLocations: Array,
  },
  methods: {
    navigateToLocationView(locationId) {
      Navigation.navigateToLocationEditView(locationId);
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
