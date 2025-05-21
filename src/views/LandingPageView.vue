<template>
  <div class="container">
    <h1>Teretulemast</h1>
    <p>YLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <div class="button-container">
      <router-link to="/registration">
        <button class="button register">Register</button>
      </router-link>
      <router-link to="/login">
        <button class="button login">Login</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  username: "LandingPage"
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.button-container {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.register {
  background-color: #28a745;
  color: white;
}

.login {
  background-color: #007bff;
  color: white;
}

.button:hover {
  opacity: 0.8;
}
</style>