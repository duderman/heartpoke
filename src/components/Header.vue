<template>
  <section
    id="header"
    class="w-screen bg-cover bg-center flex flex-col items-center"
  >
    <video
      poster="../assets/header-bg.jpeg"
      class="absolute h-full object-cover w-full"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="../assets/header-bg.mp4" type="video/mp4" />
    </video>
    <div class="self-stretch mt-auto">
      <h1 data-aos="fade-down">Heart.Poke</h1>
      <h2 class="lowercase" data-aos="fade-down">Handpoke tattoo artist</h2>
      <Button class="mt-5 uppercase book-btn" data-aos="fade-up" url="#book">
        Book now
      </Button>
    </div>
    <ArrowDown class="mt-auto mb-10" url="#hero" />
  </section>
</template>

<script>
import Button from "./Button.vue";
import ArrowDown from "./ArrowDown.vue";

export default {
  name: "Header",
  components: { Button, ArrowDown },
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};
</script>

<style scoped>
#header {
  /* noinspection CssOverwrittenProperties */
  height: 100vh;

  /* noinspection CssUnresolvedCustomProperty,CssOverwrittenProperties */
  height: calc(var(--vh, 1vh) * 100);
}

.book-btn {
  box-shadow: 0 0 1px 2px white;
}
</style>
