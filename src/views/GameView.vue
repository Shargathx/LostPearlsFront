<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
<!--        <TeaserView/>-->
        <location-image :image-data="game.imageData"/>
        <h3>{{game.locationName}}</h3>
      </div>
      <div class="col">
        <p v-if="!isGameComplete">{{game.teaserInfo}}</p>
        <p v-else>{{game.extendedInfo}}</p>
      </div>
      <div class="col">
        <MapPicker/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>

import axios from "axios";
import GameService from "@/services/GameService";
import {useRoute} from "vue-router";
import MapPicker from "@/components/MapPicker.vue";
import TeaserView from "@/components/location/TeaserView.vue";
import LocationImage from "@/components/location/LocationImage.vue";

export default {
  name: "GameView",
  components: {LocationImage, TeaserView, MapPicker},
  data() {
    return {
      gameId: Number(useRoute().query.gameId),
      userId: '',

      game: [
        {
          locationId: '',
          locationName: '',
          teaserInfo: '',
          extendedInfo: '',
          question: '',
          answer: '',
          gameStatus: '',
          latitude: '',
          longitude:'',
          gameStartMilliseconds: '',
          gameEndMilliseconds: '',
          completeDate: '',
          points: '',
          imageData: '',
          hints: [{
            hindId: '',
            hint: '',
          }]
        }
      ],
      county: {
        countyId: '',
        countyName: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {

    getGame() {
      GameService.sendGetGameRequest(this.gameId)
          .then(response => this.game = response.data)
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
    isGameComplete() {
      return this.game.gameStatus === 'GC';
    },
  },
  beforeMount() {
    this.getGame()
  },

}




</script>