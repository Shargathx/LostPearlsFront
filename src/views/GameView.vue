<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <div class="col">
          Column
        </div>
        <div class="col">
          Column
        </div>
      </div>
      <div class="col">
        <template>
          <div id="map" style="height: 500px;">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>

import axios from "axios";
import GameService from "@/services/GameService";

export default {
  name: "GameView",
  components: {},
  data() {
    return {
      gameId: '',
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
  },
  beforeMount() {
    this.getGame()
  },

}




</script>