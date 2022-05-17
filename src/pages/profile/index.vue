<template>
  <MainLayout>
    <div class="flex flex-row items-center w-full h-12 border-y">
      <h2 class="text-xl font-medium deep-purple">Account settings</h2>
    </div>

    <div
      class="box-border w-7/12 px-16 py-10 pb-16 mt-10 bg-white rounded-md light-shadow"
    >
      <form class="w-full">
        <div class="">
          <p>Username:</p>
          <a-input v-model:value="userDetails.username" />
        </div>

        <div v-if="profile?.role?.name === 'user'" class="">
          <p>WorkHour/day:</p>
          <a-input v-model:value="userDetails.preferredWorkingHourPerDay" />
        </div>

        <div class="">
          <p>Email:</p>
          <a-input :disabled="true" v-model:value="userDetails.email" />
        </div>

        <div class="">
          <p>Role:</p>
          <a-input :disabled="true" v-model:value="userDetails.role" />
        </div>

        <div class="w-full mt-12">
          <a-button
            class="flex flex-row items-center justify-center flex-grow w-full h-12 px-6 py-4 text-white rounded-md clickable-2 bg-deep-purple space-between"
            :class="{
              disabled: isUpdating || !(userDetails.username.length >= 3),
            }"
            type="primary"
            :loading="isUpdating"
            @click="updateProfile"
          >
            <span class="font-bold" :class="{ 'ml-3': false }"
              >Update profile</span
            ></a-button
          >
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { mapState, mapActions } from "pinia";

import MainLayout from "./../../layouts/MainLayout.vue";

import { useUserProfileStore } from "../../stores/userProfile";

import { updateUserProfile } from "../../utils/httpsRequest/user";

export default defineComponent({
  name: "ProfilePage",

  components: {
    MainLayout,
  },

  computed: {
    ...mapState(useUserProfileStore, {
      profile: "userProfile",
    }),
  },

  mounted() {
    this.userDetails.username = this.profile["username"];
    this.userDetails.email = this.profile["email"];
    this.userDetails.role = this.profile["role"].name;
    this.userDetails.preferredWorkingHourPerDay =
      this.profile["preferredWorkingHourPerDay"];
  },

  methods: {
    ...mapActions(useUserProfileStore, ["getUserProfile"]),

    async updateProfile() {
      this.isUpdating = true;

      const isErr = await updateUserProfile(
        {
          username: this.userDetails.username,
          preferredWorkingHourPerDay:
            this.userDetails.preferredWorkingHourPerDay,
        },
        this.profile["id"]
      );

      if (!isErr) {
        await this.getUserProfile(this.profile["id"]);
      }

      this.isUpdating = false;
    },
  },

  setup() {
    const isUpdating = ref(false);

    const userDetails = reactive({
      username: "",
      email: "",
      role: "",
      preferredWorkingHourPerDay: 0,
    });

    return {
      userDetails,
      isUpdating,
    };
  },
});
</script>

<route lang="yaml">
name: "Profile"
</route>

<style scoped>
form > div {
  @apply flex flex-row w-full justify-between items-center mb-5;
}

form > div > p {
  @apply text-base font-medium opacity-70 mr-10;
}
</style>
