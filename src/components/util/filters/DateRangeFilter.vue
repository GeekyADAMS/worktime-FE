<template>
  <div class="flex flex-row items-center h-10">
    <div
      class="filter-icon clickable-2"
      @click="
        () => {
          resetFilter();
        }
      "
    >
      <undo-outlined class="hover:text-white" />
    </div>

    <div
      class="filter-icon clickable-2"
      :class="{ disabled: loading }"
      @click="$emit('filter', filter)"
    >
      <filter-outlined v-show="!loading" class="hover:text-white" />
      <loading-outlined v-show="loading" />
    </div>

    <div class="flex flex-row items-center h-full">
      <input
        v-model="filter.dateFrom"
        type="date"
        class="h-full rounded-md focus:outline-none"
        placeholder="Date from"
        :max="today"
        onkeydown="return false"
      />

      <arrow-right-outlined class="mx-4" />

      <input
        v-model="filter.dateTo"
        type="date"
        class="h-full rounded-md focus:outline-none"
        placeholder="Date to"
        :min="filter.dateFrom"
        :max="today"
        onkeydown="return false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import {
  FilterOutlined,
  ArrowRightOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "DateRangeFilter",

  props: {
    loading: Boolean,
  },

  components: {
    ArrowRightOutlined,
    FilterOutlined,
    UndoOutlined,
    LoadingOutlined,
  },

  methods: {
    resetFilter() {
      this.filter.dateFrom = "";
      this.filter.dateTo = "";

      this.$emit("filter", null);
    },
  },

  setup() {
    const filter = reactive({
      dateFrom: "",
      dateTo: "",
    });

    const today = new Date().toISOString().split("T")[0];

    watch(
      () => ({ ...filter }),
      (newVal) => {
        if (filter.dateFrom) {
          if (filter.dateTo) {
            if (filter.dateFrom >= filter.dateTo) {
              filter.dateTo = "";
            }
          }
        }
      }
    );

    return {
      filter,
      today,
    };
  },
});
</script>

<style scoped>
.filter-icon {
  @apply box-border h-full flex items-center px-2 mr-3 border border-gray-300 hover:border-purple-400 hover:bg-purple-400 rounded-md;
}
</style>
