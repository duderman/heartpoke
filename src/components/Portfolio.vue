<template>
  <h1>Portfolio</h1>
  <Carousel ref="carousel" :autoplay="autoplay" class="mt-5">
    <div v-for="image in thumbs" :key="image" class="agile__slide" @click="showLightbox">
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

import slide1 from "../assets/slide_1.jpg"
import slide2 from "../assets/slide_2.jpg"
import slide3 from "../assets/slide_3.jpg"
import slide4 from "../assets/slide_4.jpg"
import slide5 from "../assets/slide_5.jpg"
import slide6 from "../assets/slide_6.jpg"

import thumb1 from "../assets/slide_1_thumb.jpg"
import thumb2 from "../assets/slide_2_thumb.jpg"
import thumb3 from "../assets/slide_3_thumb.jpg"
import thumb4 from "../assets/slide_4_thumb.jpg"
import thumb5 from "../assets/slide_5_thumb.jpg"
import thumb6 from "../assets/slide_6_thumb.jpg"

export default {
  name: "Portfolio",
  components: {Carousel, VueEasyLightBox},
  setup() {
    const images = ref([slide1, slide2, slide3, slide4, slide5, slide6])
    const thumbs = ref([thumb1, thumb2, thumb3, thumb4, thumb5, thumb6])
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
      images, thumbs, index, lightboxVisible, autoplay, carousel, showLightbox, hideLightbox, slideChanged
    }
  }
}
</script>

<style scoped>
img {
  margin: auto;
}
</style>