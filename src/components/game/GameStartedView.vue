<template>
  <h5>{{ game.question }}</h5>
  <input v-model="game.answer" placeholder="Ideaalis v6iks vastuse siia kirjutada" />
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
    game: Object

  }
}
</script>

<style scoped>

</style>