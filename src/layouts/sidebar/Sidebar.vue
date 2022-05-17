<template>
  <aside
    class="h-full px-6 pt-10 border-r border-gray-200 side-bar bg-deep-purple"
  >
    <div class="w-full pb-6 mb-16 border-b border-gray-200 border-opacity-50">
      <app-logo class="w-16" />
    </div>

    <sidebar-links :sidebar="sidebarData" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppLogo from "./../../components/icons/AppLogo.vue";
import SidebarLinks from "./SidebarLinks.vue";

export default defineComponent({
  name: "SidebarView",

  components: { AppLogo, SidebarLinks },

  data() {
    return {
      sidebarData: [
        {
          name: "Dashboard",
          icon: "HomeOutlined",
          link: "/",
        },
        {
          name: "Profile",
          icon: "UserOutlined",
          link: "/profile",
        },
      ],
    };
  },
});
</script>

<style scoped>
aside {
  width: 18%;
  min-width: 18% !important;
}
</style>
