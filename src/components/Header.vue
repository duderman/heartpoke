<template>
<section id="header" class="h-screen w-screen bg-cover bg-center flex flex-col items-center">
  <div class="self-stretch mt-auto">
    <h1 class="text-white shadowed">HeartPoke</h1>
    <h2 class="font-medium text-gray-200 mt-2 p-2 shadowed">Handpoke tattoo artist</h2>
    <Button text="Book now" url="#book" class="mt-5"/>
  </div>
  <ArrowDown class="mt-auto mb-10" url="#hero" />
</section>
</template>

<script>
import Button from './Button.vue'
import ArrowDown from './ArrowDown.vue'

export default {
  name: "Header",
  components: {Button, ArrowDown}
}
</script>

<style scoped>
#header {
  background-image: url("../assets/header-bg2.jpeg");
}

.shadowed {
  text-shadow: 3px 3px #575757;
}
</style>