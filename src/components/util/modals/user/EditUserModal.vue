<template>
  <base-modal
    :is-open="isOpen"
    title="Create New User"
    @onClose="
      () => {
        resetFormDetails();
        $emit('close');
      }
    "
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

        <div class="w-full mb-8">
          <label>Expected work hours</label>

          <a-input-number
            v-model:value="userDetails.preferredWorkingHourPerDay"
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
            :class="{ disabled: isUpdatingUser || !isFormComplete }"
            type="primary"
            :loading="isUpdatingUser"
            @click="updateUser"
          >
            <span class="font-bold" :class="{ 'ml-3': false }"
              >Update user details</span
            ></a-button
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

import { useUsersStore } from "../../../../stores/users";

import { validateEmail } from "../../../../utils/helpers/validation";

export default defineComponent({
  name: "EditUserModal",

  props: {
    isOpen: Boolean,
    edit: Boolean,
    user: Object,
  },

  components: {
    BaseModal,
  },

  computed: {},

  methods: {
    ...mapActions(useUsersStore, ["addUser", "getAllUsers", "editUserDetails"]),

    async updateUser() {
      this.isUpdatingUser = true;

      if (this.user) {
        const isErr = await this.editUserDetails(
          this.user.id,
          this.userDetails
        );

        if (!isErr) {
          this.resetFormDetails();

          this.$emit("close");
        }
      }

      this.isUpdatingUser = false;
    },
  },

  setup(props) {
    const isUpdatingUser: Ref<boolean> = ref(false);
    const showPassword: Ref<boolean> = ref(false);
    const isFormComplete = ref(false);
    const userDetails = reactive({
      username: "",
      email: "",
      preferredWorkingHourPerDay: 0,
    });

    const resetFormDetails = () => {
      userDetails.username = "";
      userDetails.email = "";
      userDetails.preferredWorkingHourPerDay = 0;
    };

    watch(
      () => ({ ...userDetails }),
      (newVal) => {
        if (
          validateEmail(userDetails.email) &&
          userDetails.username.length > 2 &&
          userDetails.preferredWorkingHourPerDay
        ) {
          isFormComplete.value = true;
        } else {
          isFormComplete.value = false;
        }
      }
    );

    watch(
      () => ({ ...props.user }),
      (value) => {
        userDetails.username = value.username;
        userDetails.email = value.email;
        userDetails.preferredWorkingHourPerDay =
          value.preferredWorkingHourPerDay;
      }
    );

    return {
      isUpdatingUser,
      showPassword,
      isFormComplete,
      userDetails,
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
