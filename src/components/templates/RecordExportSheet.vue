<template>
  <div class="box-border w-full p-24 mt-10 text-lg bg-white">
    <h3 class="">Time Record For {{ profile["username"] }}</h3>

    <p>
      <b>Date from: </b>
      {{
        dateFrom || new Date(profile["createdAt"]).toISOString().split("T")[0]
      }}
    </p>

    <p v-show="dateTo">
      <b>Date to: </b>
      {{ dateTo || "unset" }}
    </p>

    <p>
      <b>Total time: </b>
      {{ totalTime }}h
    </p>

    <div class="flex flex-col">
      <b>Notes:</b>
      <ul class="ml-10 list-disc">
        <li v-for="(log, logIndex) in timeLogs" :key="logIndex">
          {{ log["description"] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useWorkLogStore } from "../../stores/workLog";
import { useUserProfileStore } from "../../stores/userProfile";

export default defineComponent({
  name: "RecordExportSheet",

  props: {
    dateFrom: String,
    dateTo: String,
  },

  computed: {
    ...mapState(useUserProfileStore, {
      profile: "userProfile",
    }),
    ...mapState(useWorkLogStore, {
      timeLogs: "allWorkRecords",
    }),

    totalTime() {
      return this.workLogStore.totalWorkTime;
    },
  },

  setup() {
    const workLogStore = useWorkLogStore();

    return { workLogStore };
  },
});
</script>

<style scoped>
p {
  margin-bottom: 1rem;
}

h3 {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 4rem;
  color: #6e78f4;
}
</style>
