<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4">Register</h2>

      <form @submit.prevent="register" class="space-y-6">

        <div class="flex flex-col space-y-2 justify-content-end">
          <AlertDanger :error-message="errorMessage"/>
        </div>

        <div class="flex flex-col space-y-2 justify-content-end">
          <label class="block mb-4 text-left me-2" for="username">Username</label>
          <input v-model="user.username" type="text" id="username" placeholder="John_Smith"
                 class="w-full p-2 border rounded" required/>
        </div>


        <div class="flex fuserol space-y-2">
          <label class="bluserb-4 text-left me-2" for="password">Password</label>
          <input v-model="user.password" type="password" id="password" class="w-full p-2 border rounded" required/>
        </div>

        <div class="flex fuserol space-y-2">
          <label class="bluserb-4 text-left me-2" for="confirmPassword">Confirm Password</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="w-full p-2 border rounded"
                 required/>
        </div>

        <div class="flex fuserol space-y-2">
          <label class="bluserb-4 text-left me-2" for="email">Email Address</label>
          <input v-model="user.email" type="email" id="email" placeholder="john.smith@gmail.com"
                 class="w-full p-2 border rounded" required/>
        </div>

        <button type="submit" class="btn btn-outline-success">Register</button>
      </form>

    </div>
  </div>
</template>

<script>
import Navigation from "@/navigation/Navigation";
import RegistrationService from "@/services/RegistrationService";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  components: {AlertDanger},
  data() {
    return {
      confirmPassword: "",

      user: {
        username: "",
        email: "",
        password: "",
      },

      successMessage: '',
      errorMessage: '',

      errorResponse: {
        message: '',
        errorCode: 0
      },
    };
  },
  methods: {

    register() {
      this.errorMessage = "";
      if (this.passwordsMatch()) {
        this.errorMessage = "Passwords do not match.";
      } else {
        this.registerNewUser()
      }

    },

    registerNewUser() {
      RegistrationService.sendPostRegistrationRequest(this.user)
          .then(() => Navigation.navigateToLoginView())
          .catch(error => {

            this.errorResponse = error.response.data


            if (this.errorResponse.errorCode === 101) {
              this.errorMessage = this.errorResponse.message
            } else {
              Navigation.navigateToErrorView()
            }
          });
    },
    passwordsMatch() {
      return this.user.password !== this.confirmPassword;
    },

  },
}


</script>

<style scoped>
/* Basic responsive styling */
</style>
