<template>
  <div class="w-full">
    <Table
      :scroll="{ y: 'calc(100vh - 28rem)' }"
      :table-layout="'fixed'"
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :show-expand-column="true"
      :sticky="true"
      :row-class-name="
        (record) =>
          record.timeWorkedInHours < record.preferredWorkingHourPerDay
            ? 'test-fail'
            : 'test-pass'
      "
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'title'">
          <span class="font-bold deep-purple"> Title </span>
        </template>
        <template v-if="column.key === 'description'">
          <span class="font-bold deep-purple"> Description </span>
        </template>
        <template v-if="column.key === 'date'">
          <span class="font-bold deep-purple"> Date </span>
        </template>
        <template v-if="column.key === 'timeWorkedInHours'">
          <span class="font-bold deep-purple"> Time Worked </span>
        </template>
        <template v-if="column.key === 'actions'">
          <span class="font-bold deep-purple"> Actions </span>
        </template>
      </template>

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'title'">
          <span class="font-medium">
            {{ record.title }}
          </span>
        </template>
        <template v-else-if="column.key === 'description'">
          <span class="flex flex-col">
            {{ record.description }}
          </span>
        </template>
        <template v-else-if="column.key === 'actions'">
          <span class="flex flex-row items-center justify-between pr-5">
            <div
              class="flex items-center clickable-2"
              @click="$emit('editRecord', record)"
            >
              <edit-outlined />
              <span class="ml-2"> Edit</span>
            </div>
            <Divider type="vertical" />
            <div
              class="flex items-center text-red-400 clickable-2"
              :class="{ disabled: deleting }"
              @click="
                () => {
                  actionIndex = index;
                  $emit('deleteRecord', {
                    id: record.id,
                    title: record.title,
                    index,
                  });
                }
              "
            >
              <delete-outlined v-show="!deleting || index !== actionIndex" />
              <loading-outlined v-show="deleting && index === actionIndex" />
              <span class="ml-2"> Delete</span>
            </div>
          </span>
        </template>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { Table, Divider } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { defineComponent, ref, watch } from "vue";

import { mapState } from "pinia";
import { useWorkLogStore } from "../../../stores/workLog";

const columns = [
  {
    name: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time Worked",
    key: "timeWorkedInHours",
    dataIndex: "timeWorkedInHours",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
  },
];

export default defineComponent({
  props: {
    loading: Boolean,
    deleting: Boolean,
  },

  components: {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
    Table,
    Divider,
  },

  computed: {
    ...mapState(useWorkLogStore, {
      data: "allWorkRecords",
    }),
  },

  setup(props) {
    const actionIndex = ref(-1);

    watch(
      () => props.deleting,
      (value) => {
        if (value === false) actionIndex.value = -1;
      }
    );

    return {
      actionIndex,
      columns,
    };
  },
});
</script>

<style>
.test-fail,
.test-pass {
  @apply text-left break-words;
}

.test-fail {
  @apply border border-red-300 bg-red-100;
}

.test-pass {
  @apply border border-green-300 bg-green-100;
}
</style>
