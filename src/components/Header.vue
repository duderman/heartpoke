<template>
<section id="header" class="w-screen bg-cover bg-center flex flex-col items-center">
  <video poster="../assets/header-bg.jpeg" class="absolute h-full object-cover w-full" autoplay muted loop playsinline>
    <source src="../assets/header-bg.mp4" type="video/mp4">
  </video>
  <div class="self-stretch mt-auto text-white">
    <h1 data-aos="fade-down">Heart.Poke</h1>
    <h2 class="font-medium mt-2 p-2 lowercase with-stroke lighter" data-aos="fade-down">Handpoke tattoo artist</h2>
    <Button class="mt-5 uppercase" data-aos="fade-up" url="#book">
      Book now
    </Button>
  </div>
  <ArrowDown class="mt-auto mb-10" url="#hero" />
</section>
</template>

<script>
import Button from './Button.vue'
import ArrowDown from './ArrowDown.vue'

export default {
  name: "Header",
  components: {Button, ArrowDown},
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
</script>

<style scoped>
#header {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>