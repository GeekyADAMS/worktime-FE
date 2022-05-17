<template>
  <Table
    :columns="columns"
    :data-source="data"
    :loading="loading"
    :show-expand-column="true"
    :sticky="true"
    :row-class-name="
      (record) => (record.role.name === `manager` ? 'highlight-manager' : '')
    "
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'username'">
        <span class="font-bold deep-purple"> Username </span>
      </template>
      <template v-if="column.key === 'email'">
        <span class="font-bold deep-purple"> Email </span>
      </template>
      <template v-if="column.key === 'role'">
        <span class="font-bold deep-purple"> Role </span>
      </template>
      <template v-if="column.key === 'preferredWorkingHourPerDay'">
        <span class="font-bold deep-purple"> WorkHour Per Day </span>
      </template>
      <template v-if="column.key === 'actions'">
        <span class="font-bold deep-purple"> Actions </span>
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'username'">
        <span class="font-medium">
          {{ record.username }}
        </span>
      </template>
      <template v-else-if="column.key === 'email'">
        <span class="flex flex-col">
          {{ record.email }}
        </span>
      </template>
      <template v-else-if="column.key === 'role'">
        <span class="flex flex-col">
          {{ record.role.name }}
        </span>
      </template>

      <template v-else-if="column.key === 'actions'">
        <span
          class="flex flex-row items-center justify-between pr-5"
          :class="{
            disabled:
              !['user', 'manager'].includes(record.role.name) ||
              record.username === profile['username'],
          }"
        >
          <div
            class="flex items-center clickable-2"
            @click="$emit('editUser', record)"
          >
            <edit-outlined />
            <span class="ml-2"> Edit</span>
          </div>
          <Divider type="vertical" />
          <div
            class="flex items-center text-red-400 clickable-2"
            :class="{ disabled: deleting }"
            @click="
              () => {
                actionIndex = index;
                $emit('deleteUser', {
                  id: record.id,
                  username: record.username,
                  index,
                });
              }
            "
          >
            <delete-outlined v-show="!deleting || index !== actionIndex" />
            <loading-outlined v-show="deleting && index === actionIndex" />
            <span class="ml-2"> Delete</span>
          </div>
        </span>
      </template>
    </template>
  </Table>
</template>
<script lang="ts">
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { Table, Divider } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { defineComponent, ref, watch } from "vue";

import { mapState } from "pinia";
import { useUsersStore } from "../../../stores/users";
import { useUserProfileStore } from "../../../stores/userProfile";

const columns = [
  {
    name: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Preferred WorkHour/day",
    key: "preferredWorkingHourPerDay",
    dataIndex: "preferredWorkingHourPerDay",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
  },
];

export default defineComponent({
  name: "UsersTable",

  props: {
    loading: Boolean,
    deleting: Boolean,
  },

  components: {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
    Table,
    Divider,
  },

  computed: {
    ...mapState(useUsersStore, {
      data: "allUsers",
    }),
    ...mapState(useUserProfileStore, {
      profile: "userProfile",
    }),
  },

  setup(props) {
    const actionIndex = ref(-1);

    watch(
      () => props.deleting,
      (value) => {
        if (value === false) actionIndex.value = -1;
      }
    );

    return {
      actionIndex,
      columns,
    };
  },
});
</script>

<style>
.highlight-manager {
  @apply bg-green-100;
}
</style>
