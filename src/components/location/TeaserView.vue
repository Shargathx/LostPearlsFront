<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <LocationImage :image-data="location.imageData"/>
        <h4>{{location.locationName}}</h4>
      </div>
      <div class="col">
      <p>{{location.teaserInfo}}</p>
      </div>
    </div>
  </div>
</template>

<script>

import MapPicker from "@/components/MapPicker.vue";
import LocationImage from "@/components/location/LocationImage.vue";
import {useRoute} from "vue-router";
import GameService from "@/services/GameService";

export default {
  name: "TeaserView",
  components: {LocationImage, MapPicker},

  data() {
    return {
      gameId: Number(useRoute().query.gameId),

      location: {
        locationName: '',
        teaserInfo: '',

      }
    }
  },

  methods: {
    getGameTeaser() {
      GameService.sendGetGameRequest(this.gameId)
          .then(response => this.location = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
  } ,
  beforeMount() {
    this.getGameTeaser()
  }
}

</script>
