<template>
  <div class="container py-4">
    <h1 class="mb-4">Location Details</h1>
    <div class="row g-3">

      <!-- Row 1 -->
      <div class="col-md-6">
        <CountiesDropdown :selectedCountyId="locationInfo.countyId"
                          @event-new-county-selected="val => locationInfo.countyId = val"/>
      </div>

      <div class="col-md-6">
        <label for="locationName" class="form-label">Location Name</label>
        <input v-model="locationInfo.locationName" type="text" id="locationName" class="form-control"/>
      </div>

      <!-- Row 2 -->
      <div class="col-md-6">
        <div class="mb-2">
          <label for="longitude" class="form-label">Longitude</label>
          <input v-model="locationInfo.longitude" type="text" id="longitude" placeholder="näidis: 59.019 (Longitude must have at least 3 decimal places)"
                 class="form-control"/>
          <div v-if="coordinatesErrorMessage.longitude" class="text-danger mt-1">
            {{ coordinatesErrorMessage.longitude }}
          </div>
        </div>
        <div>
          <label for="latitude" class="form-label">Latitude</label>
          <input v-model="locationInfo.latitude" type="text" id="latitude" placeholder="näidis: 25.314 (Latitude must have at least 3 decimal places)"
                 class="form-control"/>
          <div v-if="coordinatesErrorMessage.latitude" class="text-danger mt-1">
            {{ coordinatesErrorMessage.latitude }}
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <label for="teaserInfo" class="form-label">Teaser Info</label>
        <textarea v-model="locationInfo.teaser" id="teaserInfo" rows="4" class="form-control"></textarea>
      </div>

      <!-- Row 3 -->
      <div class="col-md-6">
        <label for="extendedInfo" class="form-label">Extended Info</label>
        <textarea v-model="locationInfo.extendedInfo" id="extendedInfo" rows="4" class="form-control"></textarea>
      </div>

      <div class="col-md-6">
        <div>
          <label for="question" class="form-label">Question</label>
          <input v-model="locationInfo.question" type="text" id="question" class="form-control"/>
        </div>
        <div class="col-md-12">
          <label for="answer" class="form-label">Answer</label>
          <input v-model="locationInfo.answer" type="text" id="answer" class="form-control"/>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="col-12">
        <br>
        <button @click="sendPostAddLocationRequest" class="btn btn-primary"> Submit</button>
      </div>

    </div>
    <br>
    <MapPicker
        v-model:latitude="locationInfo.latitude"
        v-model:longitude="locationInfo.longitude"
    />
  </div>
</template>


<script>

import axios from "axios";
import CountiesDropdown from "@/county/CountiesDropdown.vue";
import MapPicker from "@/components/MapPicker.vue";

export default {
  name: 'LocationView',
  components: {MapPicker, CountiesDropdown},
  data() {
    return {
      locationInfo: {
        countyId: 0,
        locationName: '',
        longitude: '',
        latitude: '',
        teaser: '',
        extendedInfo: '',
        question: '',
        answer: ''
      },

      counties: [],
      userId: 0,

      coordinatesErrorMessage: {
        latitude: '',
        longitude: ''
      },

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
          .then(response => console.log("SUCCESS", response))
          .catch(error => console.error("AXIOS ERROR", error));
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


  }


}
</script>