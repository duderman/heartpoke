<template>
  <Header/>
  <Hero/>
  <Portfolio/>
  <Why/>
  <Book/>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Portfolio from './components/Portfolio.vue'
import Why from './components/Why.vue'
import Book from './components/Book.vue'

export default {
  name: "App",
  components: {Header, Hero, Portfolio, Why, Book}
}
</script>
