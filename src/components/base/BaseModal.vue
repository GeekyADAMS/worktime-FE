<template>
  <!--Modal-->
  <!-- leave-active-class="t-duration-300 t-ease-in"
    leave-class="t-opacity-100"
    leave-to-class="t-opacity-0" -->
  <transition
    v-if="isOpen"
    enter-active-class="duration-300 ease-out opacity-0"
    enter-to-class="opacity-100"
  >
    <div
      v-show="isOpen"
      :class="modalClassObject"
      class="box-border fixed inset-0 flex items-center justify-center w-full min-h-screen mx-auto overflow-y-auto outline-none modal"
      style="z-index: 2500"
    >
      <div
        :class="{
          'max-w-sm': modalSize === 'small',
          'lg:max-w-lg': modalSize === 'small',
          'xl:max-w-xl': modalSize === 'small',
          'lg:max-w-2xl': modalSize === 'medium',
          'lg:max-w-4xl': modalSize === 'large',
        }"
        class="box-border w-11/12 pt-3 pb-16 mx-auto my-auto modal-dialog md:max-w-md"
        style="z-index: 2000"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="flex justify-end">
          <button
            v-if="closable"
            class="p-2 mb-3 transition duration-300 bg-white rounded-full outline-none cursor-pointer hover:bg-gray-300 modal-close focus:outline-none"
            @click.prevent="$emit('onClose')"
          >
            <svg
              class="text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </button>
        </div>

        <div class="bg-white rounded-lg">
          <div class="px-10 py-4 text-left modal-content">
            <!--Title-->
            <div class="flex items-start justify-between pt-6">
              <p
                class="text-xl font-bold leading-tight tracking-tight matte opacity-80"
              >
                {{ title ? title : "" }}
              </p>
            </div>

            <!--Body-->
            <div class="">
              <slot></slot>
            </div>
            <!-- End Body -->
          </div>
        </div>
      </div>

      <!-- start modal overlay -->
      <div
        v-show="isOpen"
        class="fixed w-full h-full bg-gray-800 opacity-50 modal-overlay"
      ></div>
      <!-- end modal overlay -->
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "BaseModal",

  props: {
    isOpen: Boolean,
    title: {
      type: String,
      default: "",
      required: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
      required: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    modalSize: {
      type: String,
      default: "medium",
      required: false,
    },
  },

  setup(props) {
    const modalClassObject = computed(() => {
      return {
        "t-pointer-events-none": !props.isOpen,
      };
    });

    return {
      modalClassObject,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  z-index: 1900;
  top: 0;
  left: 0;
}
</style>
