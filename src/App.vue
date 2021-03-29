<template>
  <Header/>
  <Hero/>
  <Portfolio/>
  <Why/>
  <Book/>
  <Studio/>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Portfolio from './components/Portfolio.vue'
import Why from './components/Why.vue'
import Book from './components/Book.vue'
import Studio from './components/Studio.vue'

export default {
  name: "App",
  components: {Header, Hero, Portfolio, Why, Book, Studio},
  created() {
    AOS.init({
      duration: 1000
    })
  }
}
</script>
