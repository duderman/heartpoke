<template>
  <h1>Portfolio</h1>
  <h2>Look what I can do</h2>
  <Carousel ref="carousel" :autoplay="autoplay" class="mt-5">
    <div v-for="image in images" :key="image" class="agile__slide" @click="showLightbox">
      <img :alt="image" :src="image">
    </div>
  </Carousel>
  <VueEasyLightBox :imgs="images" :index="index" :move-disabled="true" :visible="lightboxVisible" @hide="hideLightbox"
                   @on-index-change="slideChanged"/>
</template>

<script>
import {ref} from 'vue'
import VueEasyLightBox from "vue-easy-lightbox";

import {Carousel} from "./carousel"

import slide1 from "../assets/slide1.png"
import slide2 from "../assets/slide2.jpg"

export default {
  name: "Portfolio",
  components: {Carousel, VueEasyLightBox},
  setup() {
    const images = ref([slide1, slide2])
    const index = ref(0)
    const lightboxVisible = ref(false)
    const autoplay = ref(true)
    const carousel = ref(null)

    function showLightbox() {
      index.value = carousel.value.getCurrentSlide()
      lightboxVisible.value = true
      autoplay.value = false
    }

    function hideLightbox() {
      lightboxVisible.value = false
      autoplay.value = true
    }

    function slideChanged(oldIndex, newIndex) {
      carousel.value.goTo(newIndex)
    }

    return {
      images, index, lightboxVisible, autoplay, carousel, showLightbox, hideLightbox, slideChanged
    }
  }
}
</script>

<style scoped>
img {
  margin: auto;
}
</style>