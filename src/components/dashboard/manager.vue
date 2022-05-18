<template>
  <div class="w-full h-12 border-y">
    <div class="flex flex-row w-full h-full">
      <div class="flex flex-row items-center h-full ml-auto">
        <a-button
          class="flex flex-row items-center h-full px-6 ml-auto text-white rounded-md clickable-2 bg-deep-purple space-between"
          :class="{ disabled: false }"
          type="primary"
          :loading="false"
          @click="showCreateModal = true"
        >
          <span class="m-3 font-bold">Create new user</span>

          <template #icon>
            <PlusOutlined class="font-bold" />
          </template>
        </a-button>
      </div>
    </div>
  </div>

  <h2 class="mt-10 mb-4 text-xl font-bold">Platform users</h2>

  <div class="flex w-full overflow-hidden rounded-md">
    <users-table
      :loading="fetchingUsers"
      :deleting="deletingUser"
      class="w-full"
      @editUser="
        (user) => {
          selectedUser = user;
          showEditModal = true;
        }
      "
      @deleteUser="deleteUser"
    />
  </div>

  <create-user-modal
    :is-open="showCreateModal"
    @close="showCreateModal = false"
  />

  <edit-user-modal
    :user="selectedUser"
    :is-open="showEditModal"
    @close="showEditModal = false"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from "vue";
import { mapState, mapActions } from "pinia";

import { PlusOutlined } from "@ant-design/icons-vue";
import { useToast } from "vue-toastification";

import CreateUserModal from "../../components/util/modals/user/CreateUserModal.vue";
import EditUserModal from "../../components/util/modals/user/EditUserModal.vue";
import UsersTable from "../../components/util/tables/UsersTable.vue";

import { deleteUser } from "../../utils/httpsRequest/users";

import { useUsersStore } from "../../stores/users";
import { useUserProfileStore } from "../../stores/userProfile";

export default defineComponent({
  name: "ManagerBoard",

  components: {
    CreateUserModal,
    EditUserModal,
    PlusOutlined,
    UsersTable,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(useUserProfileStore, {
      profile: "userProfile",
    }),
  },

  async mounted() {
    this.fetchingUsers = true;
    await this.getAllUsers();
    this.fetchingUsers = false;

    this.getUserProfile(this.profile["id"]);
  },

  methods: {
    ...mapActions(useUsersStore, ["getAllUsers", "removeUser"]),
    ...mapActions(useUserProfileStore, ["getUserProfile"]),

    async deleteUser(record) {
      if (
        !confirm(`Are you sure you want to delete user (${record.username}) ?`)
      ) {
        return;
      }

      this.deletingUser = true;

      const isErr = await deleteUser(record.id);

      if (!isErr) {
        this.removeUser(record.index);
      }

      this.deletingUser = false;
    },
  },

  setup() {
    const toast = useToast();

    const showCreateModal: Ref<boolean> = ref(false);
    const showEditModal: Ref<boolean> = ref(false);
    const fetchingUsers: Ref<boolean> = ref(false);
    const deletingUser: Ref<boolean> = ref(false);
    const selectedUser = reactive({});

    return {
      showCreateModal,
      showEditModal,
      fetchingUsers,
      deletingUser,
      toast,
      selectedUser,
    };
  },
});
</script>
