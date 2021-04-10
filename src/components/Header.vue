<template>
<section id="header" class="w-screen bg-cover bg-center flex flex-col items-center">
  <video poster="../assets/header-bg.jpeg" class="absolute h-full object-cover w-full" autoplay muted loop playsinline>
    <source src="../assets/header-bg.mp4" type="video/mp4">
  </video>
  <div class="self-stretch mt-auto text-white">
    <h1 class="uppercase stroke-1 with-stroke" data-aos="fade-down">Heart.Poke</h1>
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
.with-stroke {
  --stroke-opacity: 0.3;
  --stroke-width: 2px;
  -webkit-text-stroke: var(--stroke-width) rgba(190,24,93, var(--stroke-opacity));
}

.with-stroke.lighter {
  --stroke-opacity: 0.1;
  --stroke-width: 1px;
}

#header {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>