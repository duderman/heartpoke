<template>
  <a :href="url" class="rounded bg-indigo-400 px-4 py-3 text-white font-bold inline-block">{{ text }}</a>
</template>

<script>
export default {
  name: "Button",
  props: ["text", "url"]
}
</script>

<style scoped>

</style>