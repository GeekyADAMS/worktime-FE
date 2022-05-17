import { defineStore } from "pinia";

import { fetchAllUsers } from "../utils/httpsRequest/users";
import { updateUserProfile } from "../utils/httpsRequest/user";
import { registerUser } from "../utils/httpsRequest/auth";

export const useUsersStore = defineStore({
  id: "userUsers",

  state: () => ({
    allUsers: [],
  }),

  actions: {
    setAllUsers(records: []) {
      this.allUsers = records || [];

      console.log("Store log: ", this.allUsers);
    },
    async getAllUsers() {
      const data = await fetchAllUsers();

      if (data && data.length) {
        this.setAllUsers(data);
      }
    },
    removeUser(index) {
      this.allUsers.splice(index, 1);
    },
    async addUser(user) {
      const isErr = await registerUser(user);

      if (!isErr) {
        await this.getAllUsers();
      }

      return isErr;
    },
    async editUserDetails(id, data) {
      const isErr = await updateUserProfile(data, id);

      if (!isErr) {
        this.getAllUsers();
      }

      return isErr;
    },
  },
});
