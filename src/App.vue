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
