<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4">Register</h2>

      <form @submit.prevent="register" class="space-y-6">
        <div class="flex flex-col space-y-2 justify-content-end">
          <label class="block mb-4 text-left me-2" for="username">Username</label>
          <input v-model="props.username" type="text" id="username" placeholder="John_Smith" class="w-full p-2 border rounded" required />
        </div>


        <div class="flex flex-col space-y-2">
          <label class="block mb-4 text-left me-2" for="password">Password</label>
          <input v-model="props.password" type="password" id="password" class="w-full p-2 border rounded" required />
        </div>

        <div class="flex flex-col space-y-2">
          <label class="block mb-4 text-left me-2" for="confirmPassword">Confirm Password</label>
          <input v-model="props.confirmPassword" type="password" id="confirmPassword" class="w-full p-2 border rounded" required />
        </div>

        <div class="flex flex-col space-y-2">
          <label class="block mb-4 text-left me-2" for="email">Email Address</label>
          <input v-model="props.email" type="email" id="email" placeholder="john.smith@gmail.com" class="w-full p-2 border rounded" required />
        </div>

        <button type="submit" class="btn btn-outline-success">Register</button>
      </form>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      this.error = "";
      // Handle registration logic here (e.g., API call)
      alert("Registration successful!");
    },
  },
};
</script>

<style scoped>
/* Basic responsive styling */
</style>
