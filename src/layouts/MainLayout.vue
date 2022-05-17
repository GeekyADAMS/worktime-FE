<template>
  <div class="flex flex-row w-screen h-screen overflow-y-auto bg-slate-100">
    <SidebarView />

    <div class="flex flex-col flex-grow w-auto h-full">
      <div
        class="relative top-0 flex flex-row items-center justify-between w-full h-16 p-4 px-10 bg-white border-b border-gray-200 border-box"
      >
        <span class="text-xl font-bold light-matte">{{ route.name }}</span>

        <div
          class="flex flex-row items-center font-bold clickable-2 hover:text-red-500"
          @click="logout"
        >
          <logout-outlined class="mr-2" />
          <span>Logout</span>
        </div>
      </div>

      <div class="h-auto pt-14 px-28">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mapActions } from "pinia";

import { LogoutOutlined } from "@ant-design/icons-vue";
import SidebarView from "./../layouts/sidebar/Sidebar.vue";

import { useUserProfileStore } from "../stores/userProfile";

export default defineComponent({
  name: "MainLayout",

  components: { LogoutOutlined, SidebarView },

  methods: {
    ...mapActions(useUserProfileStore, ["setUserProfile"]),

    logout() {
      sessionStorage.clear();
      this.setUserProfile({});
      this.$router.push("/login");
    },
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const token = sessionStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
    }

    return {
      route,
    };
  },
});
</script>
