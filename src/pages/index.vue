<template>
  <MainLayout>
    <user-board v-if="profile.role.name === 'user'" />
    <manager-board v-if="profile.role.name === 'manager'" />
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";

import MainLayout from "./../layouts/MainLayout.vue";
import UserBoard from "./../components/dashboard/authUser.vue";
import ManagerBoard from "./../components/dashboard/manager.vue";

import { useUserProfileStore } from "./../stores/userProfile";

export default defineComponent({
  name: "HomePage",
  components: {
    MainLayout,
    ManagerBoard,
    UserBoard,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(useUserProfileStore, {
      profile: "userProfile",
    }),
  },

  methods: {},
});
</script>

<route lang="yaml">
name: "Home"
</route>

<style scoped></style>
