
<script setup>
import { ref, reactive } from "vue";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const loading = ref(false);
const apiError = ref("");

const errors = reactive({
  email: "",
  password: ""
});

const validate = () => {
  errors.email = "";
  errors.password = "";

  let valid = true;

  if (!email.value) {
    errors.email = "Email is required";
    valid = false;
  }

  if (!password.value) {
    errors.password = "Password is required";
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  apiError.value = "";

  if (!validate()) return;

  loading.value = true;

  try {
    // Replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    console.log({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    });

    alert("Login successful!");
  } catch (err) {
    apiError.value = "Invalid credentials";
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="420" class="pa-6 elevation-4">

      <h2 class="text-center mb-6">Login</h2>

      <v-form @submit.prevent="handleLogin" ref="formRef">

        <!-- Email -->
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :error-messages="errors.email"
          required
        />

        <!-- Password -->
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :error-messages="errors.password"
          required
        />

        <!-- Remember -->
        <v-checkbox
          v-model="rememberMe"
          label="Remember me"
          class="mt-1"
        />

        <!-- Error Message -->
        <p v-if="apiError" class="text-error text-center">
          {{ apiError }}
        </p>

        <!-- Login Button -->
        <v-btn
          block
          color="primary"
          class="mt-4"
          :loading="loading"
          type="submit"
        >
          Login
        </v-btn>

      </v-form>
    </v-card>
  </v-container>
</template>



<style scoped>
.text-error {
  color: #ef4444;
  font-size: 14px;
}
</style>
