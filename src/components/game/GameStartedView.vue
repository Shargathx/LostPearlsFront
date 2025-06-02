<template>
  <h5>{{ game.question }}</h5>
  <input type="search" v-modal="game.answer" placeholder="Siia kirjuta vastus">
  <button @click="submitAnswer">Vasta</button>
</template>

<script>

export default {
  name: "GameStartedView",
  props: {
    hints: [
      {
        hindId: '',
        hint: '',
      }
    ],
    game: Object,
    isGameStarted: false

  }
}
</script>

<style scoped>

</style>