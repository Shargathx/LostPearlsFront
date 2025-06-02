<template>
  <div class="container">
    <h1>Welcome</h1>
    <p>Become the best pearl seeker by discovering Estonia and its various hidden pearls.</p>
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