<template>
  <nav class="flex flex-col w-full mb-10" role="navigation">
    <div
      v-for="(sidebarItem, index) in sidebar"
      :key="index"
      class="flex flex-row items-center w-full p-4 mb-4 rounded-md clickable-2"
      :class="[
        route.path === sidebarItem.link ? 'link-active' : 'link-inactive',
      ]"
      @click="$router.push(sidebarItem.link)"
    >
      <component
        :is="sidebarItem.icon"
        class="mr-5"
        :style="{ fontSize: '1.1rem' }"
      />

      <span>{{ sidebarItem.name }}</span>
    </div>
  </nav>
</template>

<script lang="ts">
// import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons-vue";

export default {
  name: "SidebarLinks",

  components: {
    HomeOutlined,
    SettingOutlined,
  },

  props: {
    sidebar: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
};
</script>

<style scoped>
/* a.router-link-active {
  font-weight: bold;
} */
/* exact link will show the primary color for only the exact matching link */

.link-active {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.35),
    rgba(255, 255, 255, 0.05)
  );
  color: white;
  @apply font-bold;
}

.link-inactive {
  color: white;
  @apply font-medium;
}
</style>
