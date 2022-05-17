<template>
  <section
    class="flex flex-col items-center justify-center h-screen w-sceen login-page bg-slate-100 blue-matte"
  >
    <div
      class="flex flex-col items-center font-sans justify-center w-2/6 p-16 py-8 bg-white border border-[#bec5f9] rounded-md light-shadow"
    >
      <app-logo class="w-20 mb-3" />
      <h1 class="text-2xl font-semibold blue-matte">Login into WorkTime</h1>

      <form class="w-full mt-12" action="">
        <div class="mb-4">
          <label>Username or Email</label>
          <a-input v-model:value="userDetails.identifier" />
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
              @click="togglePasswordVisibility()"
            />
          </div>
        </div>

        <a-space class="mt-6 mb-8" style="width: 100%">
          <a-button
            class="flex flex-row items-center justify-center w-full h-12 px-6 text-white rounded-md clickable-2 bg-deep-purple space-between"
            :class="{ disabled: isLoadingUser || !isFormComplete }"
            type="primary"
            :loading="isLoadingUser"
            @click="login"
          >
            <span class="font-bold" :class="{ 'ml-3': false }"
              >Login</span
            ></a-button
          >
        </a-space>

        <div class="inline mb-3 text-sm">
          Not yet registered?
          <span
            class="ml-2 font-medium cursor-pointer deep-purple"
            @click="$router.push('/register')"
          >
            Create account</span
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { mapActions } from "pinia";

import AppLogo from "../components/icons/AppLogo.vue";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";

import { useUserProfileStore } from "../stores/userProfile";

import { loginUser } from "../utils/httpsRequest/auth";

export default defineComponent({
  components: { AppLogo, EyeOutlined, EyeInvisibleOutlined },

  name: "LoginPage",

  methods: {
    ...mapActions(useUserProfileStore, ["getUserProfile"]),

    async login() {
      this.isLoadingUser = true;

      const data = await loginUser(this.userDetails);

      if (data) {
        sessionStorage.setItem("access_token", data.jwt);
      } else {
        this.isLoadingUser = false;
        return;
      }

      const profile = await this.getUserProfile(data.user?.id);

      if (profile) {
        this.$router.push("/");
      }

      this.isLoadingUser = false;
    },
  },

  mounted() {
    sessionStorage.clear();
  },

  setup() {
    const userDetails = reactive({
      identifier: "",
      password: "",
    });

    const showPassword = ref(false);
    const isLoadingUser = ref(false);
    const isFormComplete = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    watch(
      () => ({ ...userDetails }),
      (newVal) => {
        if (userDetails.identifier && userDetails.password) {
          isFormComplete.value = true;
        } else {
          isFormComplete.value = false;
        }
      }
    );

    return {
      userDetails,
      showPassword,
      isLoadingUser,
      isFormComplete,
      togglePasswordVisibility,
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
