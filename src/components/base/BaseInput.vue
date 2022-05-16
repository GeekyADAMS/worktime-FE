<template>
  <div class="mb-4">
    <label>{{ label }}</label>
    <a-input
      :id="id"
      v-model="inputData"
      :placeholder="showPlaceholder ? `${label}${required ? ' *' : ''}` : ``"
      :type="type"
      :maxlength="maxLength"
      :minlength="minLength"
      :value="value"
      :disabled="disabled"
      v-bind="$attrs"
      autocomplete="off"
      @keyup="$emit('keyup', $event)"
      @keydown="$emit('keydown', $event)"
      @blur="$emit('blur', $event)"
      @input="$emit('input', inputData)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BaseInput",

  props: {
    styleClass: {
      type: String,
      default: "",
    },
    inputTextClass: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "Enter something",
      required: true,
    },
    type: {
      type: String,
      default: "text",
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
    warn: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 200,
    },
    minLength: {
      type: Number,
      default: 1,
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
    },
    required: {
      type: Boolean,
    },
    showPlaceholder: {
      type: Boolean,
    },
  },

  setup() {
    const inputData = ref("");

    return {
      inputData,
    };
  },
});
</script>

<style scoped>
input,
.password-input {
  border: 1.2px solid rgb(237, 237, 237);
  height: 36px;
  color: var(--light-blue-matte);
  @apply px-3 w-full rounded mt-1 font-semibold flex flex-grow;
}
input:focus,
.password-input:focus {
  outline: 2px solid rgb(190, 197, 249, 0.65);
}

label {
  font-weight: 300;
  color: var(--light-blue-matte);
}

form > div {
  @apply flex flex-col;
}
</style>
