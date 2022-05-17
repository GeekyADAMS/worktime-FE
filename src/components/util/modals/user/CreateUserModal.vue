<template>
  <base-modal
    :is-open="isOpen"
    title="Create New User"
    @onClose="$emit('close')"
  >
    <div class="w-full mx-auto mt-3 mb-10 rounded-md">
      <p class="font-light text-gray-500 description">
        Fill user details as required below.
      </p>

      <form class="w-full mt-8 user-details">
        <div class="mb-4">
          <label>Username</label>
          <a-input v-model:value="userDetails.username" />
        </div>

        <div class="mb-4">
          <label>Email</label>
          <a-input v-model:value="userDetails.email" />
        </div>

        <div class="flex flex-col mb-6">
          <label>Password</label>

          <div class="flex flex-row items-center w-full">
            <a-input
              class="w-full mr-2 password-input"
              v-model:value="userDetails.password"
              :type="showPassword ? 'text' : 'password'"
            >
            </a-input>
            <component
              :is="showPassword ? `eye-outlined` : `eye-invisible-outlined`"
              class="p-2 mt-1 border rounded cursor-pointer"
              @click="togglePassVisibility()"
            />
          </div>
        </div>

        <div class="w-full">
          <a-button
            class="flex flex-row items-center justify-center flex-grow w-full h-12 px-6 py-4 text-white rounded-md clickable-2 bg-deep-purple space-between"
            :class="{ disabled: isCreatingUser || !isFormComplete }"
            type="primary"
            :loading="isCreatingUser"
            @click="createUser"
          >
            <span class="font-bold" :class="{ 'ml-3': false }">{{
              edit ? "Update" : "Add work record"
            }}</span></a-button
          >
        </div>
      </form>
    </div>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, watch } from "vue";
import { mapActions } from "pinia";

import BaseModal from "../../../base/BaseModal.vue";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";

import { useUsersStore } from "../../../../stores/users";

import { validateEmail } from "../../../../utils/helpers/validation";

export default defineComponent({
  name: "CreateUserModal",

  props: {
    isOpen: Boolean,
    edit: Boolean,
  },

  components: {
    BaseModal,
    EyeOutlined,
    EyeInvisibleOutlined,
  },

  computed: {},

  methods: {
    ...mapActions(useUsersStore, ["addUser", "getAllUsers"]),

    async createUser() {
      const isErr = await this.addUser(this.userDetails);

      if (!isErr) {
        this.$emit("close");

        this.resetFormDetails();
      }
    },
  },

  setup() {
    const isCreatingUser: Ref<boolean> = ref(false);
    const showPassword: Ref<boolean> = ref(false);
    const isFormComplete = ref(false);
    const userDetails = reactive({
      email: "",
      username: "",
      password: "",
    });

    const togglePassVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const resetFormDetails = () => {
      userDetails.email = "";
      userDetails.username = "";
      userDetails.password = "";
    };

    watch(
      () => ({ ...userDetails }),
      (newVal) => {
        if (
          validateEmail(userDetails.email) &&
          userDetails.password.length > 6 &&
          userDetails.username.length > 2
        ) {
          isFormComplete.value = true;
        } else {
          isFormComplete.value = false;
        }
      }
    );

    return {
      isCreatingUser,
      showPassword,
      isFormComplete,
      userDetails,
      togglePassVisibility,
      resetFormDetails,
    };
  },
});
</script>

<style scoped>
label {
  @apply mb-1;
}
</style>
