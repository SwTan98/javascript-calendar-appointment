<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "../components/utils/useUserStore";
import CustomInput from "../components/common/CustomInput.vue";
import CustomButton from "../components/common/CustomButton.vue";

const user = useUserStore();
const router = useRouter();
const userInput = ref({});
const error = ref("");

const handleSubmit = async () => {
  error.value = "";
  try {
    await user.authenticate(userInput.value.email, userInput.value.password);
    router.replace("/");
  } catch (e) {
    error.value = e.message;
  }
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="wrapper">
      <h1>Login</h1>
      <CustomInput
        type="email"
        id="login-email"
        class="login-input"
        label="Email"
        v-model="userInput.email"
        required
      />
      <CustomInput
        type="password"
        id="login-password"
        class="login-input"
        label="Password"
        v-model="userInput.password"
        required
      />
      <span class="login-error" v-if="error">{{ error }}</span>
      <CustomButton class="login-button" type="submit" label="Login" />
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
  height: calc(100vh - 2rem);
  margin: auto;
}

.wrapper {
  display: flex;
  align-items: center;
  padding: 30px 60px;
  width: 100%;
  min-width: 250px;
  max-width: 400px;
  background-color: var(--color-background-mute);
  border-radius: var(--border-radius);
}

div.login-input {
  width: 100%;
  min-width: 200px;
}

button.login-button {
  margin-top: var(--gap);
  min-width: 200px;
}

span.login-error {
  color: var(--danger);
}
</style>
