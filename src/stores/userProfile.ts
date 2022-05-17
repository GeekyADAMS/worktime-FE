import { defineStore } from "pinia";
import { fetchUserProfile } from "../utils/httpsRequest/user";

export const useUserProfileStore = defineStore({
  id: "userProfile",
  state: () => ({
    userProfile: {
      role: {
        name: "",
      },
    },
  }),

  persist: true,

  getters: {},

  actions: {
    async getUserProfile(id) {
      const data = await fetchUserProfile(id);

      if (data) {
        // console.log("User data: ", data);
        this.setUserProfile(data);
      }

      return data;
    },
    setUserProfile(profile) {
      this.userProfile = profile;
    },
  },
});
