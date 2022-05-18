import { defineStore } from "pinia";
import { useUserProfileStore } from "../stores/userProfile";

import {
  createWorkLog,
  fetchUserWorkLogs,
  updateWorkLog,
} from "../utils/httpsRequest/workLog";

type Record = {
  id?: number;
  title: string;
  description: string;
  date: string;
  timeWorkedInHours: number;
  users_permissions_user?: any;
};

export const useWorkLogStore = defineStore({
  id: "workLog",

  state: () => ({
    workRecord: {
      id: -1,
      title: "",
      description: "",
      date: "",
      timeWorkedInHours: 0,
    },

    allWorkRecords: [],
  }),
  getters: {
    totalWorkTime: (state) => {
      let total = 0;

      for (let i = 0; i < state.allWorkRecords.length; i++) {
        total += Number(state.allWorkRecords[i]["timeWorkedInHours"]);
      }

      return total;
    },
  },
  actions: {
    setWorkRecord(record) {
      this.workRecord.id = record.id || -1;
      this.workRecord.title = record.title;
      this.workRecord.description = record.description;
      this.workRecord.date = record.date;
      this.workRecord.timeWorkedInHours = record.timeWorkedInHours;
    },
    setAllWorkRecord(records: []) {
      this.allWorkRecords = records;

      // console.log("Heyyyyy", records);
    },
    resetWorkRecord() {
      this.workRecord = {
        id: -1,
        title: "",
        description: "",
        date: "",
        timeWorkedInHours: 0,
      };
    },
    async getAllWorkRecords(filter) {
      const profile = useUserProfileStore();

      const { record } = await fetchUserWorkLogs(
        profile.userProfile["id"],
        filter
      );

      this.setAllWorkRecord(record);
    },
    removeWorkRecord(index) {
      this.allWorkRecords.splice(index, 1);
    },
    async addWorkRecord() {
      const profile = useUserProfileStore();

      const record: Record = {
        users_permissions_user: profile.userProfile["id"],
        ...this.workRecord,
      };
      delete record.id;

      const response = await createWorkLog(record);

      return response;
    },
    async editWorkRecord(id) {
      const record = { ...this.workRecord };

      const response = await updateWorkLog(record, id);

      return response;
    },
  },
});
