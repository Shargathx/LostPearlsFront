<template>
  <div class="min-h-screen registration-wrapper d-flex justify-content-center align-items-center">

    <img
        src="@/assets/search.png"
        alt="Caricature"
        class="caricature-image"
    />

    <!-- Registration form -->
    <div class="registration-box">
      <h2 class="text-2xl font-bold mb-4">Register</h2>

      <form @submit.prevent="register">
        <div class="mb-3">
          <AlertDanger :error-message="errorMessage" />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="username" class="form-label me-3 fixed-label">Username</label>
          <input
              v-model="user.username"
              type="text"
              id="username"
              placeholder="John_Smith"
              class="form-control"
              required
          />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="password" class="form-label me-3 fixed-label">Password</label>
          <input
              v-model="user.password"
              type="password"
              id="password"
              class="form-control"
              required
          />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="confirmPassword" class="form-label me-3 fixed-label">Confirm Password</label>
          <input
              v-model="user.confirmPassword"
              type="password"
              id="confirmPassword"
              class="form-control"
              required
          />
        </div>

        <div class="d-flex align-items-center mb-3">
          <label for="email" class="form-label me-3 fixed-label">Email Address</label>
          <input
              v-model="user.email"
              type="email"
              id="email"
              placeholder="john.smith@gmail.com"
              class="form-control"
              required
          />
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
.registration-wrapper {
  position: relative;
  min-height: 100vh;
  background-image: url('@/assets/registration_stock.jpg');
  background-size: cover;
  background-position: center top 30%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  margin-top: -62px; /* shifts entire wrapper upwards */
  padding-bottom: 60px;
  overflow: hidden;
  /* stacking context */
  z-index: 0;
}

.registration-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.2); /* white overlay */
  backdrop-filter: blur(4px);
  z-index: 1;
}

/* caricature image positioned absolutely with z-index between blur and form */
.caricature-image {
  position: absolute;
  left: 10%; /* a bit left side */
  top: 45%;
  transform: translateY(-50%) scaleX(-1); /* center vertically and flip horizontally */
  height: 70%; /* roughly same height as form */
  z-index: 2;
  user-select: none;
  pointer-events: none; /* so clicks pass through */
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2)); /* optional subtle shadow */
}

/* registration form above everything */
.registration-box {
  position: relative;
  z-index: 3;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 30px 5px rgba(0, 0, 0, 0.4);
  max-width: 500px;
  width: 100%;
}

.d-flex.align-items-center.mb-3 {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space between label and input */
}

.fixed-label {
  width: 120px;      /* fixed label width for alignment */
  flex-shrink: 0;    /* prevent label shrinking */
  text-align: left;  /* left-align label text */
}

.d-flex.align-items-center.mb-3 input.form-control {
  flex-grow: 1;      /* input fills remaining space */
  min-width: 0;      /* prevent overflow */
}
</style>