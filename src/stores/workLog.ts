import { defineStore } from "pinia";
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
    doubleCount: (state) => state.workRecord.timeWorkedInHours * 2,
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
      this.allWorkRecords = records || [];

      console.log(records);
    },
    resetWordRecord() {
      this.workRecord = {
        id: -1,
        title: "",
        description: "",
        date: "",
        timeWorkedInHours: 0,
      };
    },
    async getAllWorkRecords() {
      const { record } = await fetchUserWorkLogs();

      this.setAllWorkRecord(record);
    },
    removeWorkRecord(index) {
      this.allWorkRecords.splice(index, 1);
    },
    async addWorkRecord() {
      const record: Record = { users_permissions_user: 2, ...this.workRecord };
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
