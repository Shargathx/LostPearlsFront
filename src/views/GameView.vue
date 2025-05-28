<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <!--        <TeaserView/>-->
        <location-image :image-data="game.imageData"/>
        <h3>{{ game.locationName }}</h3>
        <h5>{{ game.countyName }}</h5>
      </div>
      <div class="col">
        <p v-if="displayTeaserInfo">{{ game.teaserInfo }}</p>
        <p v-if="displayExtendedInfo">{{ game.extendedInfo }}</p>
      </div>
      <div class="col">
        <GameMap
            :zoom-level="game.zoomLevel"
            :latitude="game.lat"
            :longitude="game.lng"
            @update:latitude="setGameLatitude"
            @update:longitude="val => game.lng = val"
            @update:zoomLevel="setGameZoomLevel"
        />
      </div>
    </div>
    <div class="row">
      <div  v-if="game.gameStatus === 'GA' " class="col justify-content-center">
        <button @click="startAndUpdateGame" type="button" class="btn btn-outline-success">START</button>
      </div>
      <div v-if="game.gameStatus === 'GS' " class="col justify-content-center">
        <h5>{{ game.question }}</h5>
        <input v-model="game.answer" placeholder="Ideaalis v6iks vastuse siia kirjutada" />
        <button @click="submitAnswer">Vasta</button>
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
import GameMap from "@/components/GameMap.vue";
import CountyService from "@/services/CountyService";

export default {
  name: "GameView",
  components: {LocationImage, TeaserView, MapPicker, GameMap},
  data() {
    return {
      gameId: Number(useRoute().query.gameId),
      userId: '',
      displayTeaserInfo: false,
      displayExtendedInfo: false,
      isAdded: true,

      game: {
        countyName: '',
        locationId: 0,
        locationName: '',
        teaserInfo: '',
        extendedInfo: '',
        question: '',
        answer: '',
        gameStatus: '',
        gameStartMilliseconds: 0,
        gameEndMilliseconds: 0,
        completeDate: '',
        points: 0,
        imageData: '',
        lat: 58.6662,
        lng: 25.5824,
        zoomLevel: 0
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
          .then(response => this.handleGetGameResponse(response))
          .catch(error => console.error("API Error:", error.response))
    },

    handleGetGameResponse(response) {
      this.game = response.data;
      this.displayTeaserInfo = !this.isGameComplete()
      this.displayExtendedInfo = this.isGameComplete()
      this.game.lat = parseFloat(response.data.lat);
      this.game.lng = parseFloat(response.data.lng);

    },
    setGameLatitude(latitude) {
      this.game.lat = latitude;
    },

    setGameZoomLevel(zoomLevel) {
      this.game.zoomLevel = zoomLevel;
    },

    startAndUpdateGame() {
      this.game.gameStatus = 'GS';
      this.game.gameStartMilliseconds = Date.now();
      GameService.sendPatchGameRequest(this.gameId, this.game)
          .then(response => {
            this.game = response.data;
            this.refreshGameView()
          })
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
    addGame(){
      axiospo
    }

    isGameComplete() {
      return this.game.gameStatus === 'GC'
    },
    refreshGameView() {
      // this.getGame() or
      this.$forceUpdate()
    },
    submitAnswer() {

    },
  },

  beforeMount() {
    this.getGame()
  }
}


</script>