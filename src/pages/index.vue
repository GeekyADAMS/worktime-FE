<template>
  <MainLayout>
    <div class="w-full h-12 border-y">
      <div class="flex flex-row w-full h-full">
        <div class="flex flex-row items-center h-full ml-auto">
          <a-button
            class="flex flex-row items-center h-full px-6 ml-auto text-white rounded-md clickable-2 bg-deep-purple space-between"
            :class="{ disabled: false }"
            type="primary"
            :loading="false"
            @click="openCreateMode"
          >
            <span class="m-3 font-bold">Log new task</span>

            <template #icon>
              <PlusOutlined class="font-bold" />
            </template>
          </a-button>

          <div
            class="flex items-center justify-center h-full p-3 ml-2 bg-white border rounded-md clickable-2 border-box"
            @click="showHourSettingModal = true"
          >
            <setting-outlined />
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full my-16 overflow-hidden rounded-md">
      <task-record-table
        :loading="loadingRecord"
        :deleting="deletingRecord"
        class="w-full"
        @editRecord="openEditMode"
        @deleteRecord="deleteRecord"
      />
    </div>

    <task-entry-modal
      :is-open="showCreateModal"
      :edit="editRecord"
      @close="closeWorkEntryModal"
    />

    <hour-setting-modal
      :is-open="showHourSettingModal"
      @close="closeHourSettingModal"
    />
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { mapActions } from "pinia";

import MainLayout from "./../layouts/MainLayout.vue";

import { PlusOutlined, SettingOutlined } from "@ant-design/icons-vue";
import HourSettingModal from "../components/util/modals/HoursSettingModal.vue";
import TaskEntryModal from "../components/util/modals/TaskEntryModal.vue";
import TaskRecordTable from "../components/util/tables/TaskRecordTable.vue";

import { deleteWorkLog } from "../utils/httpsRequest/workLog";

import { useWorkLogStore } from "../stores/workLog";

export default defineComponent({
  name: "HomePage",
  components: {
    HourSettingModal,
    MainLayout,
    PlusOutlined,
    SettingOutlined,
    TaskEntryModal,
    TaskRecordTable,
  },

  data() {
    return {};
  },

  async mounted() {
    this.loadingRecord = true;
    await this.getAllWorkRecords();
    this.loadingRecord = false;
  },

  methods: {
    ...mapActions(useWorkLogStore, ["getAllWorkRecords", "removeWorkRecord"]),

    openEditMode(record) {
      this.editRecord = true;

      const workLog = useWorkLogStore();
      workLog.setWorkRecord(record);

      this.showCreateModal = true;
    },
    openCreateMode() {
      this.resetLastWorkLog();
      this.showCreateModal = true;
    },
    resetLastWorkLog() {
      const workLog = useWorkLogStore();
      workLog.resetWordRecord();
    },
    closeWorkEntryModal() {
      this.resetLastWorkLog();

      this.showCreateModal = false;
      this.editRecord = false;
    },
    closeHourSettingModal() {
      this.showHourSettingModal = false;
    },
    async deleteRecord(record) {
      this.deletingRecord = true;

      const isErr = await deleteWorkLog(record.id);

      if (!isErr) {
        this.removeWorkRecord(record.index);
      }

      this.deletingRecord = false;
    },
  },

  setup() {
    const showCreateModal: Ref<boolean> = ref(false);
    const showHourSettingModal: Ref<boolean> = ref(false);
    const editRecord: Ref<boolean> = ref(false);
    const loadingRecord: Ref<boolean> = ref(false);
    const deletingRecord: Ref<boolean> = ref(false);

    return {
      showCreateModal,
      showHourSettingModal,
      editRecord,
      loadingRecord,
      deletingRecord,
    };
  },
});
</script>

<route lang="yaml">
name: "Home"
</route>

<style scoped></style>
