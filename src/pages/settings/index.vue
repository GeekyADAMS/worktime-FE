<template>
  <MainLayout>
    <div class="w-full h-12 border">Settings</div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MainLayout from "./../../layouts/MainLayout.vue";

export default defineComponent({
  name: "SettingsPage",

  components: {
    MainLayout,
  },
});
</script>

<route lang="yaml">
name: "Settings"
</route>
