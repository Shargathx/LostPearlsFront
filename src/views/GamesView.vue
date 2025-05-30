<template>
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
          <GameLocationsGrid/>
        </div>
      </section>


      <GameFields :counties="counties"/>

      <!-- My Played Games -->
      <section class="played-games">
        <h2>My Played Games</h2>
        <ul>
          <li v-for="playedGame in playedGames" :key="playedGame.id">
            {{ playedGame.name }} - Completed: {{ playedGame.completedDate }}
          </li>
        </ul>
      </section>
    </section>

    <!-- Right Side Map Picker -->
    <aside class="content-right">
      <StaticGameFieldsMapPicker :markers="activeGameMarkers"/>
    </aside>
  </div>
</template>

<script>
import GameLocationsGrid from "@/components/game/GameLocationsGrid.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";
import AddLocationModal from "@/components/modal/AddGameModal.vue";
import GameFields from "@/components/game/GameFields.vue";
import StaticGameFieldsMapPicker from "@/components/StaticGameFieldsMapPicker.vue";
import CountyService from "@/services/CountyService";
import GameService from "@/services/GameService";

export default {
  components: {
    StaticGameFieldsMapPicker,
    GameFields,
    GameLocationsGrid,
    LogOutModal,
    AddLocationModal,
  },

  data() {
    return {
      activeGameMarkers: [],

      counties: {
        type: Array,
        default: () => []
      },


      completedGames: [
        {id: 101, name: "Game A", completedDate: "2024-04-15", score: 85},
        {id: 102, name: "Game B", completedDate: "2024-05-10", score: 92},
      ],
    };
  },

  methods: {






  },

  beforeMount() {
    CountyService.getAllCounties()
        .then(response => {
          this.counties = response.data;
        })
        .catch(() => {
          alert("Failed to load counties.");
        });

    GameService.getUSerGamesInProgress()
        .then(response => {
          this.counties = response.data;
        })
        .catch(() => "Something failed")
  }

};
</script>


<style scoped>
.page-grid {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 3fr 2fr;
  grid-template-areas:
    "banner banner"
    "navbar navbar"
    "leftside rightside";
  gap: 1rem;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.banner {
  grid-area: banner;
  background-color: #3f51b5;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar {
  grid-area: navbar;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
  justify-content: space-between; /* keep left/right spaced */
}

.nav-left {
  flex: 1;
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center; /* center the buttons */
  gap: 1rem;
}

.nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}


.nav-btn:hover {
  background-color: #ddd;
}

.content-left {
  grid-area: leftside;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.content-right {
  grid-area: rightside;
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

.the-game .placeholder-box {
  height: 100px;
  background-color: #e0e0e0;
  border: 1px dashed #999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.initiate-games .game-fields {
  display: flex;
  gap: 1rem;
}

.game-field {
  flex: 1;
  border: 1px solid #aaa;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: #fff;
  transition: background-color 0.3s;
}

.game-field:hover {
  background-color: #f9f9f9;
}

.thumbnail img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
}

.played-games ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.played-games li {
  margin-bottom: 0.3rem;
}

.game-field {
  position: relative;
  cursor: pointer;
}

.plus-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: green;
  font-weight: bold;
  pointer-events: none; /* so clicks pass through */
  opacity: 0;
  transition: opacity 0.3s ease;
  user-select: none;
}

.game-field.empty-slot:hover .plus-overlay {
  opacity: 1;
}

/* Optional: a nice plus sign using ::before */
.plus-overlay::before {
  content: '+';
}

</style>
