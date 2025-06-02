<template>
  <LogOutModal
      :modal-is-open="modalIsOpen"
      @event-close-modal="closeModal"
      @event-logout-confirmed="executeLogOut"
  />

  <nav class="bg-white py-3 shadow-sm">
    <div class="container d-flex justify-content-center align-items-center gap-4 flex-wrap">
      <router-link class="nav-link px-2 fw-semibold fs-5" to="/about">How to play</router-link>

      <template v-if="isLoggedIn">
        <router-link class="nav-link px-2 fw-semibold fs-5" to="/games">Games</router-link>
        <router-link class="nav-link px-2 fw-semibold fs-5" to="/locations">My locations</router-link>
      </template>

      <template v-else>
        <router-link class="nav-link px-2 fw-semibold fs-5" to="/login">Log in</router-link>
      </template>

      <template v-if="isLoggedIn">
        <font-awesome-icon
            @click="startLogOutProcess"
            class="ms-4 text-danger cursor-pointer fs-4"
            icon="right-from-bracket"
            title="Logi välja"
        />
      </template>
    </div>
  </nav>

  <router-view @event-update-nav-menu="updateNavMenu" />
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