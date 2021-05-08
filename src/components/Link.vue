<template>
  <a :href="url" class="text-pink-700 underline" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  name: "Link",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>
