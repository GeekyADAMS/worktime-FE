<template>
  <section
    class="flex flex-col items-center justify-center h-screen w-sceen login-page bg-slate-100 blue-matte"
  >
    <div
      class="flex flex-col items-center font-sans justify-center w-2/6 p-16 py-8 bg-white border border-[#bec5f9] rounded-md light-shadow"
    >
      <app-logo class="w-20 mb-3" />
      <h1 class="text-2xl font-semibold blue-matte">Register on WorkTime</h1>

      <form class="w-full mt-12" action="">
        <div class="mb-4">
          <label>Username</label>
          <a-input v-model:value="userDetails.username" />
        </div>
        <div class="mb-4">
          <label>Email</label>
          <a-input v-model:value="userDetails.email"></a-input>
        </div>

        <div class="mb-4">
          <label>Password</label>

          <div class="flex flex-row items-center w-full">
            <a-input
              class="w-full mr-2 password-input"
              v-model:value="userDetails.password"
              :type="showPassword ? 'text' : 'password'"
            >
            </a-input>
            <component
              :is="showPassword ? `eye-outlined` : `eye-invisible-outlined`"
              class="p-2 mt-1 border rounded cursor-pointer"
              @click="togglePassVisibility('password')"
            />
          </div>
        </div>

        <div class="mb-6">
          <label>Confirm password</label>

          <div class="flex flex-row items-center w-full">
            <a-input
              class="w-full mr-2 password-input"
              v-model:value="userDetails.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
            >
            </a-input>

            <component
              :is="
                showConfirmPassword ? `eye-outlined` : `eye-invisible-outlined`
              "
              class="p-2 mt-1 border rounded cursor-pointer"
              @click="togglePassVisibility('confirm')"
            />
          </div>
        </div>

        <a-space class="mt-6 mb-2" style="width: 100%">
          <a-button
            class="flex flex-row items-center justify-center w-full px-6 py-3 text-white rounded-md clickable-2 bg-deep-purple space-between"
            :class="{ disabled: !isFormComplete || isRegistering }"
            type="primary"
            :loading="isRegistering"
            @click="register"
          >
            <span class="font-bold" :class="{ 'ml-3': false }"
              >Create account</span
            ></a-button
          >
        </a-space>

        <div class="inline text-sm">
          Already have an account?
          <span
            class="ml-2 font-medium cursor-pointer deep-purple"
            @click="$router.push('/login')"
          >
            Login here</span
          >
        </div>

        <div class="inline text-sm">
          Forgot password?
          <span class="ml-2 font-medium text-orange-500 cursor-pointer">
            Reset password here</span
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import AppLogo from "../components/icons/AppLogo.vue";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";

import { registerUser } from "../utils/httpsRequest/auth";

import { validateEmail } from "../utils/helpers/validation";

export default defineComponent({
  components: { AppLogo, EyeOutlined, EyeInvisibleOutlined },

  name: "CreateAccount",

  methods: {
    async register() {
      this.isRegistering = true;
      const isErr = await registerUser(this.userDetails);

      if (!isErr) {
        this.$router.push("/login");
      }
      this.isRegistering = false;
    },
  },

  setup() {
    const userDetails = reactive({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isRegistering = ref(false);
    const isFormComplete = ref(false);

    const togglePassVisibility = (type: string) => {
      if (type === "password") {
        showPassword.value = !showPassword.value;
      } else {
        showConfirmPassword.value = !showConfirmPassword.value;
      }
    };

    watch(
      () => ({ ...userDetails }),
      (newVal) => {
        if (
          validateEmail(userDetails.email) &&
          userDetails.password.length > 6 &&
          userDetails.confirmPassword === userDetails.password &&
          userDetails.username.length > 2
        ) {
          isFormComplete.value = true;
        } else {
          isFormComplete.value = false;
        }
      }
    );

    return {
      userDetails,
      showPassword,
      showConfirmPassword,
      togglePassVisibility,
      isRegistering,
      isFormComplete,
    };
  },
});
</script>

<style scoped>
input,
.password-input {
  border: 1.2px solid rgb(237, 237, 237);
  height: 36px;
  color: var(--light-blue-matte);
  @apply px-3 w-full rounded mt-1 font-semibold flex flex-grow;
}
input:focus,
.password-input:focus {
  outline: 2px solid rgb(190, 197, 249, 0.65);
}

label {
  font-weight: 300;
  color: var(--light-blue-matte);
}

form > div {
  @apply flex flex-col;
}
</style>
