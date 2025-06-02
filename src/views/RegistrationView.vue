<template>
  <div class="min-h-screen bg-gray-100 d-flex justify-content-center align-items-center">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4">Register</h2>

      <form @submit.prevent="register">

        <div class="mb-3">
          <AlertDanger :error-message="errorMessage" />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="username" class="form-label me-3 fixed-label text-end">Username</label>
          <input v-model="user.username" type="text" id="username" placeholder="John_Smith" class="form-control" required />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="password" class="form-label me-3 fixed-label text-end">Password</label>
          <input v-model="user.password" type="password" id="password" class="form-control" required />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="confirmPassword" class="form-label me-3 fixed-label text-end">Confirm Password</label>
          <input v-model="user.confirmPassword" type="password" id="confirmPassword" class="form-control" required />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="email" class="form-label me-3 fixed-label text-end">Email Address</label>
          <input v-model="user.email" type="email" id="email" placeholder="john.smith@gmail.com" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-outline-success w-100">Register</button>

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
      user: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
      if (!this.allFieldsAreWithCorrectInput()) {
        this.errorMessage = "Please fill all fields correctly (username > 3 chars, password >= 3 chars).";
        return;
      }

      if (!this.passwordsMatch()) {
        this.errorMessage = "Passwords do not match.";
        return;
      }
      this.errorMessage = "";
      this.registerNewUser();
    },

    allFieldsAreWithCorrectInput() {
      const username = this.user.username;
      const password = this.user.password;
      const usernamePattern = /^[A-Za-z][A-Za-z0-9]*$/;
      return (
          username.length > 3 &&
          usernamePattern.test(username) &&
          password.length >= 3
      )
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
      return this.user.password === this.user.confirmPassword;
    },

  },
}


</script>

<style scoped>
.fixed-label {
  width: 30%;
  height: 3rem;
  display: flex;
  align-items: center;
  white-space: normal;
  padding-top: 0.50rem; /* adjust this value */
}
</style>