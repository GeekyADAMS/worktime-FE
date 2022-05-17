<template>
  <base-modal
    :is-open="isOpen"
    :title="edit ? 'Edit Work Record' : 'Log New Task'"
    @onClose="$emit('close')"
  >
    <div class="w-full mx-auto mt-3 mb-10 rounded-md">
      <p class="font-light text-gray-500 description">
        Fill task work log Record as required below.
      </p>

      <form class="w-full mt-8 task-entry">
        <div class="mb-4">
          <label>Task title</label>
          <a-input v-model:value="workRecord.title" />
        </div>

        <div class="mb-4">
          <label>Description</label>
          <a-textarea
            v-model:value="workRecord.description"
            :rows="4"
            placeholder="Enter task description here. Character limit (250)"
            :maxlength="250"
          />
        </div>

        <div class="mb-6">
          <label>Date</label>
          <input v-model="workRecord.date" type="date" />
        </div>

        <div class="w-full mb-10">
          <label>Hours worked (e.g. 5)</label>
          <a-input-number
            v-model:value="workRecord.timeWorkedInHours"
            type="number"
            :controls="false"
            :min="1"
            :max="24"
            class="w-full"
          />
        </div>

        <div class="w-full">
          <a-button
            class="flex flex-row items-center justify-center flex-grow w-full h-12 px-6 py-4 text-white rounded-md clickable-2 bg-deep-purple space-between"
            :class="{ disabled: isUpdatingWorkLog }"
            type="primary"
            :loading="isUpdatingWorkLog"
            @click="edit ? editRecord(workRecord.id) : addRecord()"
          >
            <span class="font-bold" :class="{ 'ml-3': false }">{{
              edit ? "Edit work record" : "Add work record"
            }}</span></a-button
          >
        </div>
      </form>
    </div>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import BaseModal from "../../base/BaseModal.vue";

import { mapWritableState, mapActions } from "pinia";
import { useWorkLogStore } from "../../../stores/workLog";

export default defineComponent({
  name: "TaskEntryModal",

  props: {
    isOpen: Boolean,
    edit: Boolean,
  },

  components: {
    BaseModal,
  },

  computed: {
    ...mapWritableState(useWorkLogStore, {
      workRecord: "workRecord",
    }),
  },

  methods: {
    ...mapActions(useWorkLogStore, [
      "addWorkRecord",
      "editWorkRecord",
      "getAllWorkRecords",
    ]),

    async addRecord() {
      const isErr = await this.addWorkRecord();

      if (!isErr) {
        await this.getAllWorkRecords();
        this.$emit("close");
        return;
      }
    },

    async editRecord(id) {
      const isErr = await this.editWorkRecord(id);

      if (!isErr) {
        await this.getAllWorkRecords();
        this.$emit("close");
        return;
      }
    },
  },

  setup() {
    const isUpdatingWorkLog: Ref<boolean> = ref(false);

    return {
      isUpdatingWorkLog,
    };
  },
});
</script>

<style scoped>
label {
  @apply mb-1;
}
</style>
