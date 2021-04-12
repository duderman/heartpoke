<template>
  <section id="hero" class="mx-7 mt-10">
    <img alt="It's me" data-aos="zoom-in" src="../assets/hero.jpeg">
    <h1>About me</h1>
    <p class="first-cap">
      My name is Katie and I’m a hand poke tattoo artist.
      My career began in Saint-Petersburg, Russia in October 2018.
      I always feel happiness when I’m drawing and I was interested in tattoos for ages.
      One day I decided that I need to change my life and to finally start doing what I love.
    </p>
    <p>
      My life changing decision was to buy a tattoo course from <Link url="https://www.instagram.com/lerahandpoke/">@lerahandpoke</Link>.
      I fell in love with tattooing and since then I’m feeling that I found my passion, my place.
    </p>
    <p>
      The design of my works reflects the aesthetics of nature themes: flowers, insects, field herbs.
      Also I love tattooing my handwriting. Each tattoo is unique, as are the people who come to the sessions.
      I like to combine natural forms with body lines.
      I truly believe that tattoos are empowering and really help to feel more confident (with or without the meaning
      behind the tattoo).
    </p>
  </section>
</template>

<script>
import Link from './Link.vue'

export default {
  name: "Hero",
  components: {Link}
}
</script>

<style scoped>
p {
  @apply mt-5;
  @apply text-justify;
  text-indent: 2em;
}

.first-cap {
  text-indent: 0;
}

.first-cap:first-letter {
  @apply text-8xl;
  @apply font-bold;
  @apply float-left;
  @apply mr-5;
}
</style>