<template>
  <a
    :class="{
      'bg-gray-500 cursor-not-allowed': disabled,
      'bg-pink-700 cursor-pointer': !disabled,
    }"
    :href="url"
    class="rounded px-4 py-3 text-white font-bold inline-block inline-flex items-center"
    @click="onClick"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
    <slot />
  </a>
</template>

<script>
export default {
  name: "Button",
  props: {
    url: {
      type: String,
      default: "#",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(e) {
      if (!this.disabled) {
        return true;
      }

      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    },
  },
};
</script>
