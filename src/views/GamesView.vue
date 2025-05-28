<template>
  <div class="page-grid">
    <!-- Banner -->
    <header class="banner justify-content-center">
      <h1>My Game Dashboard</h1>
    </header>

    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-left">
        <!-- Could add a logo here or leave empty -->
      </div>
      <div class="nav-center">
        <button v-for="btn in navButtons" :key="btn.id" class="nav-btn">
          {{ btn.label }}
        </button>
      </div>
      <div class="nav-right">
        <button @click="goToProfile">My Profile</button>
        <button @click="">Log Out</button>
      </div>
    </nav>

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

      <!-- Initiate Games Fields -->
      <section class="initiate-games">
        <h2>Start a New Game</h2>
        <div class="game-fields">
          <div
              v-for="(field, index) in initiateFields"
              :key="index"
              class="game-field"
              @click="openAddLocation(index)"
          >
            <div class="thumbnail">
              <img
                  src="actual-image.jpg"
                  onerror="this.onerror=null; this.src='https://cdn3.emoji.gg/emojis/82146-skulltoppray.png';"
                  style="max-width: 100%; height: auto;"
                  alt="image"
              />
            </div>
            <div class="info">
              <p><strong>Name:</strong> {{ field.name || 'Click to add' }}</p>
              <p><strong>County:</strong> {{ field.county || 'Click to add' }}</p>
            </div>
          </div>
        </div>
      </section>

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
      <StaticMapPicker :markers="activeGameMarkers"/>
    </aside>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import StaticMapPicker from "@/components/StaticMapPicker.vue";
import GameLocationsGrid from "@/components/game/GameLocationsGrid.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";

// Nav buttons placeholders
const navButtons = ref([
  {id: 1, label: 'Home'},
  {id: 2, label: 'Games'},
  {id: 3, label: 'Settings'},
])

// Completed games stats placeholder
const completedGames = ref([
  {id: 101, name: 'Game A', completedDate: '2024-04-15', score: 85},
  {id: 102, name: 'Game B', completedDate: '2024-05-10', score: 92},
])

// Initiate game fields, initially empty
const initiateFields = ref([
  {name: '', county: '', image: ''},
  {name: '', county: '', image: ''},
  {name: '', county: '', image: ''},
])

const placeholderImage = 'https://cdn3.emoji.gg/emojis/82146-skulltoppray.png'

// Played games from backend (dummy fetch)
const playedGames = ref([])

// Active game markers for MapPicker
const activeGameMarkers = ref([])

// Simulated fetch on mounted
onMounted(() => {
  fetchPlayedGames()
})

function fetchPlayedGames() {
  // Dummy async fetch, replace with real API call
  setTimeout(() => {
    playedGames.value = [
      {id: 201, name: 'Adventure Quest', completedDate: '2024-01-20'},
      {id: 202, name: 'Mystery Island', completedDate: '2024-03-05'},
    ]

    // For map markers, simulate from playedGames or active games
    activeGameMarkers.value = [
      {id: 1, lat: 40.7128, lng: -74.006, label: 'Adventure Quest'},
      {id: 2, lat: 34.0522, lng: -118.2437, label: 'Mystery Island'},
    ]
  }, 500)
}

function openAddLocation(index) {
  // Logic to open modal or navigate to add location page
  alert(`Open Add Location modal/page for field ${index + 1}`)
}

function goToProfile() {
  alert('Go to My Profile page')
}

function logout() {
  alert('Logging out...')
}
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
</style>
