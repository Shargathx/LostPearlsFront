<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12">
        <h2>Locations added by me</h2>
      </div>
    </div>

    <div class="row justify-content-center mb-3">
      <div class="col-auto">
        <button class="btn btn-info" @click="navigateToAddLocationView()">Add location</button>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center">
        <div class="locations-table w-100">
          <LocationsTable :user-locations="userLocations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocationsTable from "@/components/location/LocationsTable.vue";
import LocationService from "@/services/LocationService";
import Navigation from "@/navigation/Navigation";

export default {
  name: "LocationsView",
  components: { LocationsTable },
  data() {
    return {
      userId: Number(sessionStorage.getItem("userId")),
      roleName: sessionStorage.getItem("roleName"),
      userLocations: [
        {
          locationId: 0,
          locationName: "",
          countyName: "",
          longitude: 0,
          latitude: 0,
          zoomlevel: 0,
          teaser: "",
          extendedInfo: "",
          question: "",
          answer: "",
          status: "",
          dateAdded: ""
        }
      ]
    };
  },
  methods: {
    getUserLocations() {
      LocationService.sendGetUserLocationsRequest(this.userId)
          .then(response => this.userLocations = response.data);
    },
    navigateToAddLocationView() {
      Navigation.navigateToLocationView();
    }
  },
  beforeMount() {
    this.getUserLocations();
  }
};
</script>

<style scoped>
.locations-table {
  max-width: 800px;
  margin: 0 auto;
}
</style>
