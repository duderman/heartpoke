<template>
  <a :href="url" target="_blank" class="text-pink-700 underline">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "Link",
  props: {
    url: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>

</style>