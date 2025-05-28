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
                :disabled="isViewMode"
            />
          </div>

          <div class="col-12">
            <label for="locationName" class="form-label">Location Name</label>
            <input
                v-model="locationInfo.locationName"
                type="text"
                id="locationName"
                class="form-control"
                :disabled="isViewMode"
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
                :disabled="isViewMode"
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
                :disabled="isViewMode"
            />
          </div>

          <div class="col-12">
            <div class="m-3">
              <label>zoom level:</label>
              <input
                  v-model.number="locationInfo.zoomlevel"
                  type="number"
                  :disabled="isViewMode"
              />
            </div>

            <label for="teaserInfo" class="form-label">Teaser Info</label>
            <textarea
                v-model="locationInfo.teaser"
                id="teaserInfo"
                rows="2"
                class="form-control"
                :disabled="isViewMode">
            </textarea>
          </div>

          <div class="col-12">
            <label for="extendedInfo" class="form-label">Extended Info</label>
            <textarea
                v-model="locationInfo.extendedInfo"
                id="extendedInfo"
                rows="2"
                class="form-control"
                :disabled="isViewMode">
            </textarea>
          </div>

          <div class="col-12">
            <label for="question" class="form-label">Question</label>
            <textarea
                v-model="locationInfo.question"
                type="text"
                id="question"
                class="form-control"
                :disabled="isViewMode">

            </textarea>
          </div>

          <div class="col-12">
            <label for="answer" class="form-label">Answer</label>
            <input
                v-model="locationInfo.answer"
                type="text"
                id="answer"
                class="form-control"
                :disabled="isViewMode"/>
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
                v-if="isViewMode"
                @click="switchToEdit"
                class="btn btn-secondary"
            >
              Edit
            </button>
            <button
                v-if="isEditMode"
                :disabled="duplicateExists || !locationInfoChanged"
                @click="submitLocation"
                class="btn btn-primary"
            >
              {{ locationId === 0 ? "Submit" : "Save changes" }}
            </button>
          </div>

          <!-- siin Kaspari lisatud vihjete ja keywordide lisamine -->
          <div class="col-12">
            <label> Answer keywords </label>
            <LocationKeywordsTable :keywords="keywords"/>
            <Modal :modal-is-open="false"></Modal>
          </div>
        </div>
      </div>

      <!-- Right side: Map -->
      <div class="col-md-6 mt-3 mt-md-0">
        <MapPicker
            :zoom-level="locationInfo.zoomlevel"
            :latitude="locationInfo.latitude"
            :longitude="locationInfo.longitude"
            @update:latitude="setLocationInfoLatitude"
            @update:longitude="val => locationInfo.longitude = val"
            @update:zoomLevel="setLocationInfoZoomLevel"
            :disabled="!isEditMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CountiesDropdown from "@/county/CountiesDropdown.vue";
import MapPicker from "@/components/MapPicker.vue";
import Navigation from "@/navigation/Navigation";
import LocationService from "@/services/LocationService";
import CountyService from "@/services/CountyService";
import {useRoute} from "vue-router";
import Modal from "@/components/modal/Modal.vue";
import LocationKeywordsTable from "@/components/location/LocationKeywordsTable.vue";


export default {
  name: "LocationView",
  components: {
    LocationKeywordsTable,
    Modal,
    MapPicker,
    CountiesDropdown
  },

  data() {
    return {
      isEditMode: true, // start in edit mode
      isViewMode: false,
      userId: Number(sessionStorage.getItem("userId")),
      locationId: 0,

      zoomLevel: 12,

      selectedCounty: {
        latitude: 0,
        longitude: 0,
        zoomlevel: 0,
      },

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

      originalLocationInfo: {
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

      coordinatesErrorMessage: {
        latitude: "",
        longitude: "",
      },

      keywords: [
        {
          answerId: 0,
          keyword: "",
        },
      ],
    };
  },
  computed: {
    locationInfoChanged() {
      return (
          JSON.stringify(this.locationInfo) !== JSON.stringify(this.originalLocationInfo)
      );
    },
  },


  methods: {
    handleNewCountySelected(countyId) {
      this.locationInfo.countyId = countyId;
      CountyService.sendGetCountyRequest(countyId)
          .then((response) => this.handleGetCountyResponse(response))
          .catch(() => Navigation.navigateToErrorView());
    },

    handleGetCountyResponse(response) {
      this.selectedCounty = response.data;
      this.locationInfo.latitude = this.selectedCounty.latitude;
      this.locationInfo.longitude = this.selectedCounty.longitude;
      this.locationInfo.zoomlevel = this.selectedCounty.zoomlevel;
    },

    setLocationInfoLatitude(latitude) {
      this.locationInfo.latitude = latitude;
    },

    setLocationInfoZoomLevel(zoomLevel) {
      this.locationInfo.zoomlevel = zoomLevel;
    },

    getLocation() {
      LocationService.sendGetLocationRequest(this.locationId)
          .then((response) => this.handleGetLocationResponse(response))
          .catch(() => Navigation.navigateToErrorView());
    },

    switchToEdit() {
      this.isViewMode = false;
      this.isEditMode = true;
    },

    submitLocation() {
      if (this.locationId === 0) {
        this.sendPostLocationRequest();
      } else {
        this.sendPutLocationRequest();
      }
    },

    sendPutLocationRequest() {
      if (!this.locationInfoChanged) {
        alert("No changes made");
        return;
      }
      LocationService.sendPutLocationRequest(this.locationId, this.locationInfo)
          .then(() => {
            this.successMessage = "Location updated successfully!";
            this.isViewMode = true;
            this.isEditMode = false;
            this.originalLocationInfo = {...this.locationInfo};
            setTimeout(this.resetAllMessages, 3000);
          })
          .catch(() => {
            this.errorMessage = "Error updating location";
            setTimeout(this.resetAllMessages, 3000);
          });
    },

    handleGetLocationResponse(response) {
      this.locationInfo = response.data;
      this.originalLocationInfo = {...response.data};
    },

    sendPostLocationRequest() {
      LocationService.sendPostLocationRequest(this.userId, this.locationInfo)
          .then((response) => {
            this.locationId = response.data;

            this.isEditMode = false;
            this.isViewMode = true;

            this.successMessage = "Location added successfully!";
            this.originalLocationInfo = {...this.locationInfo};

            setTimeout(this.resetAllMessages, 3000);
            Navigation.navigateToLocationEditView(this.locationId);
          })
          .catch(() => {
            this.errorMessage = "Asukoha lisamisel tekkis viga";
            setTimeout(this.resetAllMessages, 3000);
          });
    },

    resetAllMessages() {
      this.successMessage = "";
      this.errorMessage = "";
    },
  },

  autoResize(event) {
    const textarea = event.target
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  },

  beforeMount() {
    this.isViewMode = useRoute().query.locationId !== undefined;
    this.isEditMode = !this.isViewMode;

    if (this.isViewMode) {
      this.locationId = Number(useRoute().query.locationId);
      this.getLocation();
    }
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
