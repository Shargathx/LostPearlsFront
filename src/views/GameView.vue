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
      <div class="col leaflet-container">
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
      <div v-if=isGameStarted class="game-container">
        <!--  Midagi mida ehk hiljem kasutada.      <GameStartedView/>-->
        <div class="question-container">
          <h5>{{ game.question }}</h5>
        </div>
        <div class="answer-container">
          <input type="search" v-modal="game.answer" placeholder="Siia kirjuta vastus">
          <button @click="submitAnswer">Vasta</button>
          <h5>⏳ Timer: {{ formattedElapsedTime() }}</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="hintPromptActive" class="hint-prompt">
        <p>Kas sa soovid vihjet?</p>
        <button @click="offerHint">Jah</button>
        <button @click="declineHint">Ei</button>
      </div>
      <div v-if="selectedHint" class="hint-display">
        <h5>{{ selectedHint }}</h5>
      </div>
      <div v-if="hintsPaused" class="request-hint">
        <button @click="resumeHints">Küsi vihjet</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.game-container {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  align-items: flex-start; /* Align everything to the left */
}
.question-container {
  width: 100%;
  text-align: left; /* Ensures the question stays on one line */
  margin-bottom: 10px; /* Adds spacing before the answer box */
}

.answer-container {
  display: flex;
  align-items: center;
  gap: 15px; /* Adds spacing between elements */
}

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
import HintService from "@/services/HintService";

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
      gameElapsedMilliseconds: '',
      nextHintTime:'',
      timerInterval:'',

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
      hintPromptActive: false,
      selectedHint:'',
      availableHints:'',
      hintsPaused: '',


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
      this.fetchHints()
    },


    startGameTimer() {
      let storedTime = localStorage.getItem("gameStartTime");
      this.game.gameStartMilliseconds = storedTime ? Number(storedTime) : Date.now() ;

      localStorage.setItem("gameStartTime", this.game.gameStartMilliseconds);
      this.gameElapsedMilliseconds = Date.now() - this.game.gameStartMilliseconds;
      this.nextHintTime = 5000;
      this.timerInterval = setInterval(() => {
        this.gameElapsedMilliseconds = Date.now() - this.game.gameStartMilliseconds;
        localStorage.setItem("gameElapsedMilliseconds", this.gameElapsedMilliseconds);

        // Offer a hint every 10 minutes
        if (this.gameElapsedMilliseconds >= this.nextHintTime) {
          this.hintPromptActive = true;
          this.nextHintTime += 5000; // Schedule next hint - 60000
        }

        // If 60 minutes pass, set points to 0
        if (this.gameElapsedMilliseconds >= 3600000) {
          this.game.points = 0;
        }
      }, 1000);
    },

    formattedElapsedTime() {
      let totalSeconds = Math.floor(this.gameElapsedMilliseconds / 1000);
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return `${minutes}m ${seconds}s`;
    },

    offerHint() {
      this.hintPromptActive = false;
      this.getHint(); // Generate a hint only when "Jah" is clicked
      this.hintsPaused = false; // Resume automatic hint prompts
    },

    declineHint() {
      this.hintPromptActive = false; // Hide prompt
      this.hintsPaused = true; // Pause automatic hint prompts
    },

    resumeHints() {
      this.hintsPaused = false; // Resume automatic hint prompts
      this.getHint(); // Give the previously declined hint
    },

    fetchHints() {
      HintService.sendGetHintsRequest(this.game.locationId)
          .then(response => this.hints = response.data)
          .catch(() => alert("Vihjeid pole v6i said otsa. Oled omap2i."));
    },

    getHint() {
      if (this.hints.length === 0) {
        this.selectedHint = "No hints available.";
        return;
      }

      let randomHint = this.hints[Math.floor(Math.random() * this.hints.length)];
      this.selectedHint = randomHint.hint; // Show the selected hint
      this.hintPromptActive = false;
    }
  },

  beforeMount() {
    this.getGame();
  }
}

</script>