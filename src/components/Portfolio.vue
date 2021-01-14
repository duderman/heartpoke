<template>
  <h1>Portfolio</h1>
  <h2>Look what I can do</h2>
  <VueAgile :autoplay="true" class="mt-5">
    <div class="agile__slide">
      <img alt="1" src="../assets/slide1.png">
    </div>
    <div class="agile__slide">
      <img alt="2" src="../assets/slide2.jpg">
    </div>
  </VueAgile>
</template>

<script>
import {VueAgile} from "../vue-agile"

export default {
  name: "Portfolio",
  components: {VueAgile},
}
</script>

<style scoped>
img {
  margin: auto;
}
</style>