<template>
  <div>

    <div class="row justify-content-center">
      <div class="col col-4">
        <AlertDanger :error-message="errorMessage"/>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col col-2">

        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label">Kasutajanimi või parool</label>
            <input v-model="loginName" type="text" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Parool</label>
            <input v-model="password" type="password" class="form-control">
          </div>

          <button @click="login" type="submit" class="btn btn-outline-success">Logi sisse</button>
        </form>


      </div>
    </div>
  </div>

</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import LoginService from "@/services/LoginService";
import Navigation from "@/navigation/Navigation";
import ErrorCodes from "@/errors/ErrorCodes";


export default {
  name: "LoginView",
  components: {AlertDanger},
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


  }

}
</script>


