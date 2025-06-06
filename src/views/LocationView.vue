<template>
  <div class="container py-4">


    <AddKeywordModal :modal-is-open="addKeywordModalIsOpen"
                     @event-execute-add-keyword="executeAddNewKeyword"
                     @event-close-modal="closeAddKeywordModal"
    />

    <h1 class="mb-4">Location Details</h1>
    <div class="row">
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

          <div v-if="isAdmin" class="col-12">
            <div class="m-3 flex flex-col">
              <label class="mb-1 font-semibold text-gray-700 me-3">Zoom Level</label>
              <input
                  v-model.number="locationInfo.zoomlevel"
                  type="number"
                  :disabled="isViewMode"
                  class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Enter zoom level"
              />
            </div>
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
                class="btn btn-secondary">
              Edit
            </button>
            <button
                v-if="isEditMode"
                :disabled="duplicateExists || !locationInfoChanged"
                @click="submitLocation"
                class="btn btn-primary">
              {{ locationId === 0 ? "Submit" : "Save changes" }}
            </button>
            <button
                v-if="isEditMode"
                @click="cancelEdit"
                class="btn btn-outline-secondary ms-2">
              Cancel
            </button>
          </div>

          <!-- siin Kaspari lisatud vihjete ja keywordide lisamine -->
          <div v-if="this.isViewMode" class="col-12 mb-3 mt-5">
            <AlertDanger :error-message="alertKeywordMissingMessage"/>
            <button class="btn btn-success mb-3" @click="viewAddKeywordModal">Add keywords</button>
            <LocationKeywordsTable v-if="this.isViewMode" :keywords="keywords"
                                   @event-keyword-deleted="getLocationKeywords"
            />
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
        <br>
        <AlertDanger :error-message="alertImageMissingMessage"/>
        <ImageInput v-if="isEditMode"
                    class="mt-3" ref="imageInput"
                    @event-new-image-selected="setLocationImageData"
                    :disabled="!isEditMode"/>
        <div>
          <LocationImage :image-data="locationInfo.imageData"
                         @open-file-picker="triggerFilePicker"
                         :disabled="!isEditMode"/>
        </div>
      </div>
      <div>

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
import LocationImage from "@/components/location/LocationImage.vue";
import ImageInput from "@/components/image/ImageInput.vue";
import KeywordService from "@/services/KeywordService";
import DeleteKeywordModal from "@/components/modal/DeleteKeywordModal.vue";
import AddKeywordModal from "@/components/modal/AddKeywordModal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";


export default {
  name: "LocationView",
  components: {
    AlertDanger,
    AddKeywordModal,
    DeleteKeywordModal,
    ImageInput,
    LocationImage,
    LocationKeywordsTable,
    Modal,
    MapPicker,
    CountiesDropdown
  },

  data() {
    return {
      roleName: sessionStorage.getItem("roleName"),
      isAdmin : false,
      isEditMode: true,
      isViewMode: false,
      userId: Number(sessionStorage.getItem("userId")),
      locationId: 0,
      addKeywordModalIsOpen: false,
      alertKeywordMissingMessage: '',
      alertImageMissingMessage: 'Add picture for enhanced information',

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
        imageData: ""
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

      keyword: {
        locationId: 0,
        keyword: ""
      },


      keywords: [
        {
          keywordId: 0,
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
          .then(response => this.handleGetLocationResponse(response))
          .catch(() => Navigation.navigateToErrorView());
    },

    getLocationKeywords() {
      KeywordService.sendGetKeywordsRequest(this.locationId)
          .then(response => this.handleGetLocationKeywordsResponse(response))
          .catch(() => Navigation.navigateToErrorView());
    },
    handleGetLocationKeywordsResponse(response) {
      this.keywords = response.data
      if (this.keywords.length === 0) {
        this.alertKeywordMissingMessage = 'At least one keyword is mandatory'
      } else {
        this.alertKeywordMissingMessage = ''

      }
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

    cancelEdit() {
      this.locationInfo = {...this.originalLocationInfo};
      this.resetAllMessages();
      this.isEditMode = false;
      this.isViewMode = true;
    },

    resetAllMessages() {
      this.successMessage = "";
      this.errorMessage = "";
    },

    setLocationImageData(imageData) {
      this.locationInfo.imageData = imageData
      this.alertImageMissingMessage = ''
    },

    triggerFilePicker() {
      if (this.$refs.imageInput && typeof this.$refs.imageInput.openFilePicker === 'function') {
        this.$refs.imageInput.openFilePicker();
      } else {
        console.warn('Image input is not available or openFilePicker method missing.');
      }
    },


    autoResize(event) {
      const textarea = event.target
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    },


    //  keyword asjad
    viewAddKeywordModal() {
      this.addKeywordModalIsOpen = true
    },

    closeAddKeywordModal() {
      this.addKeywordModalIsOpen = false
    },

    executeAddNewKeyword(newKeyword) {
      this.keyword.keyword = newKeyword
      this.keyword.locationId = this.locationId
      KeywordService.sendAddKeywordRequest(this.keyword)
          .then(() => {
            this.addKeywordModalIsOpen = false
            this.keyword.keyword = ''
            this.getLocationKeywords()
          })
          .catch(() => Navigation.navigateToErrorView())
    },

    handleUserRole() {
      const role = sessionStorage.getItem("roleName")
      if (role === "admin") {
        this.isAdmin = true
      }
    },

  },

  beforeMount() {
    this.handleUserRole()
    this.isViewMode = useRoute().query.locationId !== undefined;
    this.isEditMode = !this.isViewMode;

    if (this.isViewMode) {
      this.locationId = Number(useRoute().query.locationId)
      this.getLocation()
      this.getLocationKeywords()
    }
  },

};
</script>

<style scoped>
/* Add your component styles here */
</style>


