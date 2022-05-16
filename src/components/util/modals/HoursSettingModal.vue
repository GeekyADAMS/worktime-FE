<template>
  <base-modal
    :is-open="isOpen"
    title="Hours Settings"
    modal-size="small"
    @onClose="closeModal"
  >
    <div class="w-full mx-auto mt-3 mb-10 rounded-md">
      <p class="font-light text-gray-500 description">
        Fill your expected work time in hours
      </p>

      <form class="w-full mt-8 task-entry">
        <div class="w-full mb-10">
          <label>Expected work hours</label>
          <a-input-number
            v-model:value="workHour"
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
            :class="{ disabled: isSetting }"
            type="primary"
            :loading="isSetting"
            @click="setUserWorkHour"
          >
            <span class="font-bold" :class="{ 'ml-3': false }"
              >Update work hour</span
            ></a-button
          >
        </div>
      </form>
    </div>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseModal from "../../base/BaseModal.vue";

import { mapState, mapActions } from "pinia";
import { useUserProfileStore } from "../../../stores/userProfile";
import { useWorkLogStore } from "../../../stores/workLog";
import { setUserPreferredWorkHour } from "../../../utils/httpsRequest/user";

export default defineComponent({
  name: "HourSettingModal",

  props: {
    isOpen: Boolean,
    edit: Boolean,
  },

  components: {
    BaseModal,
  },

  computed: {
    ...mapState(useUserProfileStore, {
      profile: "userProfile",
    }),
  },

  mounted() {
    this.workHour = this.profile["preferredWorkingHourPerDay"] || 0;
  },

  methods: {
    ...mapActions(useUserProfileStore, ["getUserProfile"]),
    ...mapActions(useWorkLogStore, ["getAllWorkRecords"]),

    async setUserWorkHour() {
      this.isSetting = true;

      const isErr = await setUserPreferredWorkHour(
        this.workHour,
        this.profile["id"]
      );

      if (!isErr) {
        await this.getUserProfile(this.profile["id"]);
        await this.getAllWorkRecords();
        this.closeModal();
      }

      this.isSetting = false;
    },
    closeModal() {
      this.$emit("close");
      this.workHour = this.profile["preferredWorkingHourPerDay"] || 0;
    },
  },

  setup() {
    const workHour = ref(0);
    const isSetting = ref(false);

    return {
      workHour,
      isSetting,
    };
  },
});
</script>

<style scoped>
label {
  @apply mb-1;
}
</style>
