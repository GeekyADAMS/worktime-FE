<template>
  <div class="flex flex-row w-screen h-screen overflow-y-auto bg-slate-100">
    <SidebarView />

    <div class="flex flex-col flex-grow w-auto h-full">
      <div
        class="relative top-0 flex flex-row items-center justify-between w-full h-16 p-4 px-10 bg-white border-b border-gray-200 border-box"
      >
        <span class="text-xl font-bold light-matte">{{ route.name }}</span>
      </div>

      <div class="h-auto pt-14 px-28">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import SidebarView from "./../layouts/sidebar/Sidebar.vue";

export default defineComponent({
  name: "MainLayout",

  components: { SidebarView },

  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>
