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
                @event-new-county-selected="val => locationInfo.countyId = val"
            />
          </div>

          <div class="col-12">
            <label for="locationName" class="form-label">Location Name</label>
            <input v-model="locationInfo.locationName" type="text" id="locationName" class="form-control"/>
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
            />
            <div v-if="coordinatesErrorMessage.longitude" class="text-danger mt-1">
              {{ coordinatesErrorMessage.longitude }}
            </div>
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
            <div v-if="coordinatesErrorMessage.latitude" class="text-danger mt-1">
              {{ coordinatesErrorMessage.latitude }}
            </div>
          </div>

          <div class="col-12">
            <label for="teaserInfo" class="form-label">Teaser Info</label>
            <textarea v-model="locationInfo.teaser" id="teaserInfo" rows="2" class="form-control"></textarea>
          </div>

          <div class="col-12">
            <label for="extendedInfo" class="form-label">Extended Info</label>
            <textarea v-model="locationInfo.extendedInfo" id="extendedInfo" rows="2" class="form-control"></textarea>
          </div>

          <div class="col-12">
            <label for="question" class="form-label">Question</label>
            <input v-model="locationInfo.question" type="text" id="question" class="form-control"/>
          </div>

          <div class="col-12">
            <label for="answer" class="form-label">Answer</label>
            <input v-model="locationInfo.answer" type="text" id="answer" class="form-control"/>
          </div>

          <div v-if="successMessage" class="alert alert-success text-center">
            {{ successMessage }}
          </div>
          <div v-if="duplicateExists" class="alert alert-warning">
            This location already exists with the same name and coordinates.
          </div>
          <div class="col-12 text-end mt-3">
            <button :disabled="duplicateExists" @click="sendPostAddLocationRequest" class="btn btn-primary">Submit
            </button>
          </div>
        </div>
      </div>

      <!-- Right side: Map -->
      <div class="col-md-6 mt-3 mt-md-0">
        <MapPicker
            :latitude="Number(locationInfo.latitude)"
            :longitude="Number(locationInfo.longitude)"
            @update:latitude="val => locationInfo.latitude = val"
            @update:longitude="val => locationInfo.longitude = val"
        />
      </div>
    </div>
  </div>
</template>


<script>

import axios from "axios";
import CountiesDropdown from "@/county/CountiesDropdown.vue";
import MapPicker from "@/components/MapPicker.vue";
import {round} from "@popperjs/core/lib/utils/math";
import * as _ from "vue3-leaflet/src/utils/utils";

export default {
  name: 'LocationView',
  components: {MapPicker, CountiesDropdown},
  data() {
    return {
      locationInfo: {
        countyId: 0,
        locationName: '',
        longitude: 24.7536,
        latitude: 59.4370,
        teaser: '',
        extendedInfo: '',
        question: '',
        answer: ''
      },

      duplicateExists: false,
      successMessage: '',

      counties: [],
      userId: 0,
      locationId: 0,

      coordinatesErrorMessage: {
        latitude: '',
        longitude: ''
      },

    }
  },

  watch: {
    locationInfo: {
      handler: _.debounce(function (newVal) {
        const {locationName, countyId, latitude, longitude} = newVal;
        if (locationName && countyId && latitude && longitude) {
          const lat = round(parseFloat(latitude));
          const long = round(parseFloat(longitude));
          this.checkDuplicateLocation(locationName, countyId, lat, long);
        } else {
          this.duplicateExists = false;
        }
      }, 300), // wait 300ms after changes stop
      deep: true
    }
  },

  methods: {

    getAllCounties() {

    },

    sendPostAddLocationRequest() {
      console.log("SEND REQUEST FUNCTION TRIGGERED");

      if (!this.validateAllCoordinates()) {
        console.warn("Coordinates not valid");
        return;
      }

      const userId = 1
      const payloadLongLat = {
        ...this.locationInfo,
        latitude: parseFloat(this.locationInfo.latitude),
        longitude: parseFloat(this.locationInfo.longitude),
      };

      console.log('Sending payload:', payloadLongLat);

      axios.post(`/location?userId=${userId}`, payloadLongLat)
          .then(response => {
            this.successMessage = 'Location added successfully!';

            setTimeout(() => {
              this.successMessage = '';
            }, 3000);

            const newLocationId = response.data.locationId;
            this.getAddedLocation(newLocationId);
          })
          .catch(error => {
            console.error('Error saving location:', error);
          });
    },


    getAddedLocation(locationId) {
      axios.get(`/location/${locationId}`) // <-- use backticks for template string
          .then(response => console.log('Fetched location:', response.data))
          .catch(error => console.error('Error fetching location:', error));
    },


    isValidCoordinate(value, type) {
      const label = type === 'lat' ? 'Latitude' : 'Longitude';
      const num = parseFloat(value);
      if (isNaN(num)) return `${label} must be a number.`;

      if (type === 'lat' && (num < -90 || num > 90)) return 'Latitude must be between -90 and 90.';
      if (type === 'long' && (num < -180 || num > 180)) return 'Longitude must be between -180 and 180.';

      const decimalPart = value.toString().split('.')[1];
      if (!decimalPart || decimalPart.length < 3) {
        return `${label} must have at least 3 decimal places.`;
      }

      return true;
    },


    validateAllCoordinates() {
      const latValidation = this.isValidCoordinate(this.locationInfo.latitude, 'lat');
      const longValidation = this.isValidCoordinate(this.locationInfo.longitude, 'long');

      this.coordinatesErrorMessage.latitude = latValidation === true ? '' : latValidation;
      this.coordinatesErrorMessage.longitude = longValidation === true ? '' : longValidation;

      return latValidation === true && longValidation === true;
    },


    checkDuplicateLocation(name, countyId, lat, long) {
      console.log('Checking duplicate:', name, countyId, lat, long);
      axios.get('/location/check-duplicate', {
        params: {locationName: name, countyId, latitude: lat, longitude: long}
      }).then(response => {
        console.log('Duplicate check response:', response.data);
        this.duplicateExists = response.data;
      }).catch(error => {
        console.error('Duplicate check error:', error);
        this.duplicateExists = false;
      });
    }


  }


}
</script>