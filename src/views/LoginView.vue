<template>
  <div class="login-view-wrapper">
    <BackgroundSlideshow/>

    <div class="login-page-container d-flex justify-content-center align-items-center">
      <div class="col-md-6 col-lg-4 login-card">
        <div class="card shadow-lg">
          <div class="card-body p-4">
            <h4 class="card-title text-center mb-4">Logi sisse</h4>

            <AlertDanger v-if="errorMessage" :error-message="errorMessage" class="mb-3"/>

            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label">Kasutajanimi või e-mail</label>
                <input v-model="loginName" type="text" class="form-control" required/>
              </div>

              <div class="mb-3">
                <label class="form-label">Parool</label>
                <input v-model="password" type="password" class="form-control" required/>
              </div>

              <div class="justify-content-center mt-3">
                <button type="submit" class="btn btn-success">Logi sisse</button>
                <button type="button" @click="navigateToRegistration" class="btn btn-outline-primary ms-3">Registreeri
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import LoginService from "@/services/LoginService";
import Navigation from "@/navigation/Navigation";
import ErrorCodes from "@/errors/ErrorCodes";
import BackgroundSlideshow from "@/components/BackgroundSlideshow.vue";


export default {
  name: "LoginView",
  components: {AlertDanger, BackgroundSlideshow},
  data() {
    return {
      loginName: '',
      password: '',

      errorMessage: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    login() {
      this.sendLoginRequest()
    },

    sendLoginRequest() {
      LoginService.sendGetLoginRequest(this.loginName, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginErrorResponse(error))
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit("event-update-nav-menu")
      Navigation.navigateToGamesView()
    },

    handleLoginErrorResponse(error) {

      let httpStatusCode = error.response.status
      this.errorResponse = error.response.data
      this.handleIncorrectCredentials(httpStatusCode);
    },

    handleIncorrectCredentials(httpStatusCode) {
      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.errorMessage = this.errorResponse.message
      } else {
        alert('k6ik on jumala pekkis')
      }
    },

    isIncorrectCredentials(httpStatusCode) {
      return httpStatusCode === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_CREDENTIALS;

    },

    navigateToRegistration() {
      Navigation.navigateToRegistration()
    },


  }

}
</script>


<style scoped>

.card {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  margin-top: 75px; /* pushes the whole container down */
}

</style>