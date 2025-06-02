<template>
  <LogOutModal :modal-is-open="modalIsOpen"
               @event-close-modal="closeModal"
               @event-logout-confirmed="executeLogOut"/>
  <nav>
    <router-link to="/about">Kuidas Mängida</router-link>
    |
    <router-link to="/games">Mängud</router-link>
    |
    <template v-if="!isLoggedIn">
      <router-link to="/login">Log in</router-link> |
    </template>
    <template v-if="isLoggedIn">
      <router-link to="/locations">Minu asukohad</router-link>|
    </template>
    <template v-if="isLoggedIn">
      <font-awesome-icon @click="startLogOutProcess" class="cursor-pointer just" icon="right-from-bracket"/>
    </template>

  </nav>
  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>


<script>

import Navigation from "@/navigation/Navigation";
import RoleService from "@/services/RoleService";
import LogOutModal from "@/components/modal/LogOutModal.vue";

export default {
  components: {LogOutModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      modalIsOpen: false,
    }
  },

  methods: {

    updateNavMenu() {
      this.isLoggedIn = RoleService.isLoggedIn()
      this.isAdmin = RoleService.isAdmin()
    },


    startLogOutProcess() {
      this.modalIsOpen = true
    },

    executeLogOut() {
      sessionStorage.clear()
      localStorage.clear()
      this.updateNavMenu()
      Navigation.navigateToLoginView()
    },

    closeModal() {
      this.modalIsOpen = false
    },

  },

  beforeMount() {
    // update Navigation menu (depending if logged in/out etc, what to show etc)
    this.updateNavMenu()
  }

};

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>