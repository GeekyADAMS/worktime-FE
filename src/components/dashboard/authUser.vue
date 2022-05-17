<template>
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

  <h2 class="mt-10 mb-4 text-xl font-bold">Work Time Logs</h2>

  <div class="flex w-full overflow-hidden rounded-md">
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
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { mapState, mapActions } from "pinia";

import { PlusOutlined, SettingOutlined } from "@ant-design/icons-vue";
import { useToast } from "vue-toastification";

import HourSettingModal from "../../components/util/modals/HoursSettingModal.vue";
import TaskEntryModal from "../../components/util/modals/TaskEntryModal.vue";
import TaskRecordTable from "../../components/util/tables/TaskRecordTable.vue";

import { deleteWorkLog } from "../../utils/httpsRequest/workLog";

import { useWorkLogStore } from "../../stores/workLog";
import { useUserProfileStore } from "../../stores/userProfile";

export default defineComponent({
  name: "UserBoard",
  components: {
    HourSettingModal,
    PlusOutlined,
    SettingOutlined,
    TaskEntryModal,
    TaskRecordTable,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(useUserProfileStore, {
      profile: "userProfile",
    }),
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
      if (this.profile["preferredWorkingHourPerDay"] <= 0) {
        this.toast.info("Please set preferred working hour below");
        return;
      }

      this.resetLastWorkLog();
      this.showCreateModal = true;
    },
    resetLastWorkLog() {
      const workLog = useWorkLogStore();
      workLog.resetWorkRecord();
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
      if (
        !confirm(`Are you sure you want to delete worklog (${record.title}) ?`)
      ) {
        return;
      }

      this.deletingRecord = true;

      const isErr = await deleteWorkLog(record.id);

      if (!isErr) {
        this.removeWorkRecord(record.index);
      }

      this.deletingRecord = false;
    },
  },

  setup() {
    const toast = useToast();

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
      toast,
    };
  },
});
</script>
