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
      <div  v-if=isGameAdded class="col justify-content-center">
        <button @click="startGame" type="button" class="btn btn-outline-success">START</button>
      </div>
      <div v-if=isGameStarted class="col align-content-lg-start">
<!--  Midagi mida ehk hiljem kasutada.      <GameStartedView/>-->
        <h5>{{ game.question }}</h5>
        <input type="search" v-modal="game.answer" placeholder="Siia kirjuta vastus">
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
import TeaserView from "@/components/location/TeaserView.vue";
import LocationImage from "@/components/location/LocationImage.vue";
import GameMap from "@/components/GameMap.vue";
import GameStartedViewView from "@/components/game/GameStartedView.vue";
import Navigation from "@/navigation/Navigation";

export default {
  name: "GameView",
  components: {GameStartedView: GameStartedViewView, LocationImage, TeaserView, GameMap},
  data() {
    return {
      isGameAdded: false,
      isGameStarted: false,
      isGameComplete: false,
      gameId: Number(useRoute().query.gameId),
      userId: '',
      displayTeaserInfo: false,
      displayExtendedInfo: false,

      game: {
        countyName: '',
        locationId: 0,
        locationName: '',
        teaserInfo: '',
        extendedInfo: '',
        question: '',
        answer: null,
        gameStatus: '',
        gameStartMilliseconds: 0,
        gameEndMilliseconds: 0,
        completeDate: '',
        points: 0,
        imageData: '',
        lat: 58.6662,
        lng: 25.5824,
        zoomLevel: 0,
      },

      hints: [
        {
          hindId: '',
          hint: '',
        }
      ],

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
      this.isGameAdded = this.game.gameStatus === 'GA'
      this.isGameStarted = this.game.gameStatus === 'GS'
      this.isGameComplete = this.game.gameStatus === 'GC'
      this.displayTeaserInfo = !this.isGameComplete
      this.displayExtendedInfo = this.isGameComplete

    },
    setGameLatitude(latitude) {
      this.game.lat = latitude;
    },

    setGameZoomLevel(zoomLevel) {
      this.game.zoomLevel = zoomLevel;
    },

    startGame() {
      GameService.sendPatchGameRequest(this.gameId)
          .then(() => this.handleStartGameResponse())
          .catch(() => Navigation.navigateToErrorView())
    },

    handleStartGameResponse() {
      this.getGame()
      this.startGameTimer()
    },


    },


    submitAnswer() {
    },

    startGameTimer() {
      this.gameElapsedMilliseconds = 0;
      this.nextHintTime = 600000; // First hint after 10 minutes
      this.timerInterval = setInterval(() => {
        this.gameElapsedMilliseconds = Date.now() - this.game.gameStartMilliseconds;

        // Offer a hint every 10 minutes
        if (this.gameElapsedMilliseconds >= this.nextHintTime) {
          this.offerHint();
          this.nextHintTime += 600000; // Schedule next hint
        }

        // If 60 minutes pass, set points to 0
        if (this.gameElapsedMilliseconds >= 3600000) {
          this.game.points = 0;
          clearInterval(this.timerInterval); // Stop timer
        }
      }, 1000);
    },

    askForHint() {
      if (confirm("Kas sa soovid vihjet?")) {
        GameService.getHint(this.gameId)
            .then(response => this.game.hint = response.data.hint)
            .catch(error => console.error("Hint fetch error:", error.response));
      }
    },
    inputPlaceholder() {
      return this.game.answer ? "" : "Ideaalis v6iks vastuse siia kirjutada";
    },
  },

  beforeMount() {
    this.getGame()
  }
}

</script>