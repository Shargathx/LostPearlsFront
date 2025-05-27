<template>
  <div class="container py-4">
    <h1 class="mb-4">Location Details</h1>

    <div class="row">
      <!-- Left side: Form fields -->
      <div class="col-md-6">
        <div class="row g-3">
          <!-- Row 1 -->
          <div class="col-12">
            <CountiesDropdown
                :selectedCountyId="locationInfo.countyId"
                @event-new-county-selected="handleNewCountySelected"
                :disabled="!isEditing"
            />
          </div>

          <div class="col-12">
            <label for="locationName" class="form-label">Location Name</label>
            <input
                v-model="locationInfo.locationName"
                type="text"
                id="locationName"
                class="form-control"
                :disabled="!isEditing"
            />
          </div>

          <!-- Row 2 -->
          <div class="col-6">
            <label for="longitude" class="form-label">Longitude</label>
            <input
                v-model="locationInfo.longitude"
                type="text"
                id="longitude"
                placeholder="näidis: 59.019"
                class="form-control"
                :disabled="!isEditing"
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
                :disabled="!isEditing"
            />
          </div>

          <div class="col-12">
            <div class="m-3">
              <label>zoom level:</label>
              <input
                  v-model.number="locationInfo.zoomlevel"
                  type="number"
                  :disabled="!isEditing"
              />
            </div>

            <label for="teaserInfo" class="form-label">Teaser Info</label>
            <textarea
                v-model="locationInfo.teaser"
                id="teaserInfo"
                rows="2"
                class="form-control"
                :disabled="!isEditing"
            ></textarea>
          </div>

          <div class="col-12">
            <label for="extendedInfo" class="form-label">Extended Info</label>
            <textarea
                v-model="locationInfo.extendedInfo"
                id="extendedInfo"
                rows="2"
                class="form-control"
                :disabled="!isEditing"
            ></textarea>
          </div>

          <div class="col-12">
            <label for="question" class="form-label">Question</label>
            <input
                v-model="locationInfo.question"
                type="text"
                id="question"
                class="form-control"
                :disabled="!isEditing"
            />
          </div>

          <div class="col-12">
            <label for="answer" class="form-label">Answer</label>
            <input
                v-model="locationInfo.answer"
                type="text"
                id="answer"
                class="form-control"
                :disabled="!isEditing"
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
            <button v-if="!isEditing" @click="isEditing = true" class="btn btn-secondary">
              Edit
            </button>
            <button
                v-else
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
            :zoom-level="locationInfo.zoomlevel"
            :latitude="parseFloat(locationInfo.latitude) || defaultLat"
            :longitude="parseFloat(locationInfo.longitude) || defaultLng"
            @update:latitude="setLocationInfoLatitude"
            @update:longitude="val => locationInfo.longitude = val"
            @update:zoomLevel="setLocationInfoZoomLevel"
            :disabled="!isEditing"
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
  components: { MapPicker, CountiesDropdown },

  data() {
    return {
      isEditing: true, // start in editing mode

      zoomLevel: 12,
      locationInfo: {
        countyId: 0,
        locationName: "",
        zoomlevel: 12,
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

      defaultLat: 59.437,
      defaultLng: 24.7536,
    };
  },

  methods: {
    updateLocationInfo(responseData) {
      this.locationInfo = {
        ...this.locationInfo,
        ...responseData,
      };
    },

    async handleNewCountySelected(countyId) {
      this.locationInfo.countyId = countyId;
      try {
        const response = await fetch(`/county/${countyId}`);
        if (!response.ok)
          throw new Error("Failed to fetch county details from server");
        const county = await response.json();

        this.locationInfo.latitude = county.latfield;
        this.locationInfo.longitude = county.longfield;
        this.locationInfo.zoomlevel = county.zoomLevel || 10;
      } catch (error) {
        console.error("Error fetching county details:", error);
      }
    },

    setLocationInfoLatitude(latitude) {
      this.locationInfo.latitude = latitude;
    },

    setLocationInfoZoomLevel(zoomLevel) {
      this.locationInfo.zoomlevel = zoomLevel;
    },

    sendPostAddLocationRequest() {
      console.log("SEND REQUEST FUNCTION TRIGGERED");

      if (!this.validateAllCoordinates()) {
        console.warn("Coordinates not valid");
        return;
      }

      const userId = 1; // or get dynamically
      const payloadLongLat = {
        ...this.locationInfo,
        latitude: parseFloat(this.locationInfo.latitude),
        longitude: parseFloat(this.locationInfo.longitude),
      };

      console.log("Sending payload:", payloadLongLat);



      axios.post(`/location?userId=${userId}`, payloadLongLat)
          .then((response) => {
            console.log("POST response data:", response.data);

            // Update locationInfo with returned data including ID
            this.locationInfo = { ...response.data };

            this.isEditing = false; // lock form after save

            this.successMessage = "Location added successfully!";
            setTimeout(() => (this.successMessage = ""), 3000);
          })
          .catch((error) => {
            this.errorMessage = "Asukoha lisamisel tekkis viga";
            setTimeout(() => (this.errorMessage = ""), 3000);
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

  mounted() {
    if (this.locationId) {
      fetch(`/location/${this.locationId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            this.locationInfo = data;
            this.isEditing = false; // show loaded data as read-only
          })
          .catch((error) => {
            console.error("There was a problem fetching location data:", error);
          });
    }
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
