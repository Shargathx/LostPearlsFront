<template>
  <AddGameModal
      :counties="counties"
      :modal-is-open="modalIsOpen"
      @event-game-added="handleEventGameAdded"
      @close="modalIsOpen = false"
  />

  <div class="page-grid">
    <section class="content-left">
      <section class="games-completed">
        <h2>Games Completed (Stats)</h2>
        <table>
          <thead>
          <tr>
            <th>Game</th>
            <th>Completed On</th>
            <th>Score</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="game in completedGames" :key="game.id">
            <td>{{ game.name }}</td>
            <td>{{ game.completedDate }}</td>
            <td>{{ game.score }}</td>
          </tr>
          </tbody>
        </table>
      </section>

      <!-- THE GAME Placeholder -->
      <section class="the-game">
        <div>
          <GameLocationsGrid />
        </div>
      </section>

      <section class="initiate-games">
        <h2>Start a New Game</h2>

        <div class="game-fields">
          <div
              v-for="gameCard in gamesInProgressInfo.gameCards"
              :key="gameCard.gameId"
              class="thumbnail-container"
              @click="goToGameView(gameCard)"
          >
            <img
                :src="gameCard.locationImageData"
                alt="Location Image"
                class="thumbnail"
            />
            <div class="overlay">
              <div class="overlay-text">
                <p>{{ gameCard.locationName }}</p>
                <p>{{ gameCard.countyName }}</p>
              </div>
            </div>
          </div>

          <!-- Add new game slot -->
          <div
              class="thumbnail-container"
              @click="openAddGameModal"
              role="button"
              tabindex="0"
              aria-label="Add new Game"
          >
            <div class="add-thumbnail">+</div>
          </div>
        </div>
      </section>

      <section class="played-games"></section>
    </section>

    <aside class="content-right">
      <StaticGameFieldsMapPicker :gameCards="gamesInProgressInfo.gameCards" />
    </aside>
  </div>
</template>


<script>
import GameLocationsGrid from "@/components/game/GameLocationsGrid.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";
import AddLocationModal from "@/components/modal/AddGameModal.vue";
import AddGameModal from "@/components/modal/AddGameModal.vue";
import GameFields from "@/components/game/GameFields.vue";
import StaticGameFieldsMapPicker from "@/components/StaticGameFieldsMapPicker.vue";
import CountyService from "@/services/CountyService";
import GameService from "@/services/GameService";
import Navigation from "@/navigation/Navigation";

export default {
  components: {
    AddGameModal,
    StaticGameFieldsMapPicker,
    GameFields,
    GameLocationsGrid,
    LogOutModal,
    AddLocationModal,
  },

  data() {
    return {
      modalIsOpen: false,

      userId: Number(sessionStorage.getItem("userId")),
      roleName: sessionStorage.getItem("roleName"),
      activeGameMarkers: [],
      playedGames: [],

      counties: [
        {
          countyId: 0,
          countyName: ''
        }
      ],

      gamesInProgressInfo: {
        totalSlots: 0,
        consumedSlots: 0,
        availableSlots: 0,
        isNextSlotAvailable: false,
        gameCards: [
          {
            gameId: 0,
            countyName: '',
            locationName: '',
            locationLat: Number,
            locationLng: Number,
            status: '',
            locationImageData: ''
          }
        ]
      },
      availableSlotsNumbers: [],


      completedGames: [
        {id: 101, name: "Game A", completedDate: "2024-04-15", score: 85},
        {id: 102, name: "Game B", completedDate: "2024-05-10", score: 92},
      ],
    };
  },


  methods: {

    handleEventGameAdded() {
      this.modalIsOpen = false
      this.getGamesInProgress()
    },

    handleGetPlayedGames(response) {
      this.gamesInProgressInfo = response.data
      this.availableSlotsNumbers = Array.from({length: this.gamesInProgressInfo.availableSlots});
      console.log("Loaded game cards:", this.gamesInProgressInfo.gameCards);
    },

    goToGameView(game) {
      GameService.sendGetGameRequest(game.gameId)
      Navigation.navigateToGameView(game.gameId)
    },

    getCounties() {
      CountyService.getAllCounties()
          .then(response => {
            this.counties = response.data;
          })
          .catch(() => {
            alert("Failed to load counties.");
          });
    },

    getGamesInProgress() {
      GameService.getUserGamesInProgress(this.userId)
          .then(response => {
            this.handleGetPlayedGames(response)
          })
          .catch(error => {
            alert("Failed to load gamesInProgress.");
          });
    },

    openAddGameModal() {
      this.modalIsOpen = true
    },

  },

  beforeMount() {
    this.getCounties()
    this.getGamesInProgress()


  }

};
</script>


<style scoped>
.page-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

.content-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.content-right {
  background-color: #fafafa;
  border-left: 1px solid #ccc;
  padding: 1rem;
  overflow-y: auto;
}

.games-completed table {
  width: 100%;
  border-collapse: collapse;
}

.games-completed th,
.games-completed td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.initiate-games .game-fields {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.thumbnail-container {
  position: relative;
  width: 320px;  /* increased width */
  height: 200px; /* increased height */
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.thumbnail-container:hover {
  transform: scale(1.05);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Darken whole image */
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center; /* <-- CHANGE THIS */
  justify-content: center;
  border-radius: 12px;
  padding: 1rem;
}

.overlay-text {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}


.thumbnail-container:hover .overlay-text {
  opacity: 1;
}

.thumbnail-container:hover .overlay {
  opacity: 1;
}

.add-thumbnail {
  background-color: #e0e0e0;
  color: #333;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  font-weight: bold;
}


</style>
