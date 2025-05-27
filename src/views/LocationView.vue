<template>
  <div class="container py-4">
    <h1 class="mb-4">Location Details</h1>

    <div class="row">
      <div class="col-md-6">
        <div class="row g-3">
          <div class="col-12">
            <CountiesDropdown
                :selectedCountyId="locationInfo.countyId"
                @event-new-county-selected="handleNewCountySelected"
            />
          </div>

          <div class="col-12">
            <label for="locationName" class="form-label">Location Name</label>
            <input
                v-model="locationInfo.locationName"
                type="text"
                id="locationName"
                class="form-control"
            />
          </div>

          <div class="col-6">
            <label for="longitude" class="form-label">Longitude</label>
            <input
                v-model="locationInfo.longitude"
                type="text"
                id="longitude"
                placeholder="näidis: 59.019"
                class="form-control"
            />
          </div>

          <div class="col-6">
            <label for="latitude" class="form-label">Latitude</label>
            <input
                v-model="locationInfo.latitude"
                type="text"
                id="latitude"
                placeholder="näidis: 25.314"
                class="form-control"
            />
          </div>

          <div class="col-12">
            <div class="m-3">
              <label>zoom level:</label>
              <input v-model.number="locationInfo.zoomLevel" type="number"/>
            </div>

            <label for="teaserInfo" class="form-label">Teaser Info</label>
            <textarea
                v-model="locationInfo.teaser"
                id="teaserInfo"
                rows="2"
                class="form-control"
            ></textarea>
          </div>

          <div class="col-12">
            <label for="extendedInfo" class="form-label">Extended Info</label>
            <textarea
                v-model="locationInfo.extendedInfo"
                id="extendedInfo"
                rows="2"
                class="form-control"
            ></textarea>
          </div>

          <div class="col-12">
            <label for="question" class="form-label">Question</label>
            <input
                v-model="locationInfo.question"
                type="text"
                id="question"
                class="form-control"
            />
          </div>

          <div class="col-12">
            <label for="answer" class="form-label">Answer</label>
            <input
                v-model="locationInfo.answer"
                type="text"
                id="answer"
                class="form-control"
            />
          </div>

          <div v-if="successMessage" class="alert alert-success text-center">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="alert alert-danger text-center">
            {{ errorMessage }}
          </div>
          <div v-if="duplicateExists" class="alert alert-warning">
            This location already exists with the same name and coordinates.
          </div>
          <div class="col-12 text-end mt-3">
            <button
                :disabled="duplicateExists"
                @click="sendPostAddLocationRequest"
                class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <!-- Right side: Map -->
      <div class="col-md-6 mt-3 mt-md-0">
        <MapPicker
            :zoom-level="game.zoomLevel"
            :latitude="parseFloat(locationInfo.latitude) || defaultLat"
            :longitude="parseFloat(locationInfo.longitude) || defaultLng"
            @update:latitude="setLocationInfoLatitude"
            @update:longitude="val => locationInfo.longitude = val"
            @update:zoomLevel="setLocationInfoZoomLevel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CountiesDropdown from "@/county/CountiesDropdown.vue";
import MapPicker from "@/components/MapPicker.vue";

export default {
  name: "LocationView",
  components: {MapPicker, CountiesDropdown},

  data() {
    return {
      zoomLevel: 12,
      locationInfo: {
        countyId: 0,
        locationName: "",
        zoomLevel: 12,
        longitude: 24.7536,
        latitude: 59.437,
        teaser: "",
        extendedInfo: "",
        question: "",
        answer: "",
      },

      duplicateExists: false,
      successMessage: "",
      errorMessage: "",

      counties: [],
      userId: 0,
      locationId: 0,

      coordinatesErrorMessage: {
        latitude: "",
        longitude: "",
      },
    };
  },


  methods: {

    // handleNewCountySelected(countyId) {
    //   this.locationInfo.countyId = countyId
    //   // TODO käivita teenus mis toob ära county kaardi andmed (long, lat, zoom)
    //   // TODO vastusest saadud tulemusest update locationInfo objektis neid andmeid
    // },

    async handleNewCountySelected(countyId) {
      this.locationInfo.countyId = countyId;
      try {
        const response = await fetch(`/county/${countyId}`);
        if (!response.ok)
          throw new Error("Failed to fetch county details from server");
        const county = await response.json();

        this.locationInfo.latitude = county.latfield;
        this.locationInfo.longitude = county.longfield;
        this.locationInfo.zoomLevel = county.zoomLevel || 10;
      } catch (error) {
        console.error("Error fetching county details:", error);
      }
    },

    setLocationInfoLatitude(latitude) {
      this.locationInfo.latitude = latitude;
    },

    setLocationInfoZoomLevel(zoomLevel) {
      this.locationInfo.zoomLevel = zoomLevel;
    },

    sendPostAddLocationRequest() {
      console.log("SEND REQUEST FUNCTION TRIGGERED");

      if (!this.validateAllCoordinates()) {
        console.warn("Coordinates not valid");
        return;
      }

      const userId = 1;
      const payloadLongLat = {
        ...this.locationInfo,
        latitude: parseFloat(this.locationInfo.latitude),
        longitude: parseFloat(this.locationInfo.longitude),
      };

      console.log("Sending payload:", payloadLongLat);

      axios.post(`/location?userId=${userId}`, payloadLongLat)
          .then((response) => {
            console.log("POST response data:", response.data); // Add this line!
            this.successMessage = "Location added successfully!";

            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
          })
          .catch((error) => {
            this.errorMessage = "Asukoha lisamisel tekkis viga";
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);
          });
    },

    isValidCoordinate(value, type) {
      const label = type === "lat" ? "Latitude" : "Longitude";
      const num = parseFloat(value);
      if (isNaN(num)) return `${label} must be a number.`;

      if (type === "lat" && (num < -90 || num > 90))
        return "Latitude must be between -90 and 90.";
      if (type === "long" && (num < -180 || num > 180))
        return "Longitude must be between -180 and 180.";

      const decimalPart = value.toString().split(".")[1];
      if (!decimalPart || decimalPart.length < 3) {
        return `${label} must have at least 3 decimal places.`;
      }

      return true;
    },

    validateAllCoordinates() {
      const latValidation = this.isValidCoordinate(
          this.locationInfo.latitude,
          "lat"
      );
      const longValidation = this.isValidCoordinate(
          this.locationInfo.longitude,
          "long"
      );

      this.coordinatesErrorMessage.latitude =
          latValidation === true ? "" : latValidation;
      this.coordinatesErrorMessage.longitude =
          longValidation === true ? "" : longValidation;

      return latValidation === true && longValidation === true;
    },
  },
};
</script>
