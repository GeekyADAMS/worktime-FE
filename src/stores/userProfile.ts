import { defineStore } from "pinia";
import { fetchUserProfile } from "../utils/httpsRequest/user";

export const useUserProfileStore = defineStore({
  id: "userProfile",
  state: () => ({
    userProfile: {},
  }),

  persist: true,

  getters: {},

  actions: {
    async getUserProfile(id) {
      const data = await fetchUserProfile(id);

      if (data) {
        this.setUserProfile(data);
      }

      return data;
    },
    setUserProfile(profile) {
      this.userProfile = profile;
    },
  },
});
