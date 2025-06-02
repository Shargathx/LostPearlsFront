<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12">
        <h2>Minu lisatud asukohad</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button @click="navigateToAddLocationView()" style="float: right">Lisa asukoht</button>
      </div>

    </div>
    <div class="row justify-content-center">
      <div class="col col-10 ">
        <LocationsTable :user-locations="userLocations"/>
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
  components: {LocationsTable},
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

    }
  },

  methods: {
    getUserLocations() {
      LocationService.sendGetUserLocationsRequest(this.userId)
          .then(response => this.userLocations = response.data)
      //todo
      //.catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    navigateToAddLocationView() {
      Navigation.navigateToLocationView()
    },
  },

  beforeMount() {
    this.getUserLocations()
  }

}
</script>


