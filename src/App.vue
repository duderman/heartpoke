<template>
  <Header/>
  <Hero/>
  <Portfolio/>
  <Book/>
  <Studio/>
  <Footer />
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Portfolio from './components/Portfolio.vue'
import Book from './components/Book.vue'
import Studio from './components/Studio.vue'
import Footer from './components/Footer.vue'

export default {
  name: "App",
  components: {Header, Hero, Portfolio, Book, Studio, Footer},
  created() {
    AOS.init({
      duration: 1000
    })
  }
}
</script>

<style>
h1 {
  text-transform: uppercase;
  text-shadow: 2px 2px deeppink;
  color: white;
}
h1,.with-stroke {
  --stroke-opacity: 0.3;
  --stroke-width: 2px;
  -webkit-text-stroke: var(--stroke-width) rgba(190,24,93, var(--stroke-opacity));
}

.with-stroke.lighter {
  --stroke-opacity: 0.1;
  --stroke-width: 1px;
}
</style>
