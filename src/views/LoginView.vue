<template>
  <div>

    <div class="row justify-content-center">
      <div class="col col-4">
        <AlertDanger :error-message="errorMessage"/> SIIA VAJA ALERT NÄHTAVAKS
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col col-2">

        <div class="mb-3">
          <label class="form-label">Kasutajanimi või parool</label>
          <input v-model="username" type="text" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control">
        </div>

        <button @click="login" type="submit" class="btn btn-outline-success">Logi sisse</button>

      </div>
    </div>
  </div>

</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "LoginView",
  components: {AlertDanger},
  data() {
    return {
      username: '',
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
}
</script>


