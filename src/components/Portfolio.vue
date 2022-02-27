<template>
  <h1>Portfolio</h1>
  <Carousel ref="carousel" :autoplay="autoplay" class="mt-5">
    <div
      v-for="image in thumbs"
      :key="image"
      class="agile__slide"
      @click="showLightbox"
    >
      <img :alt="image" :src="image" />
    </div>
    <div class="agile__slide">
      <a href="https://youtu.be/z9E5BgnNAVU" target="_blank">
        <img src="../assets/video_preview_slide.jpeg" alt="Tattoo Process" />
      </a>
    </div>
  </Carousel>
  <VueEasyLightBox
    :imgs="images"
    :index="index"
    :move-disabled="true"
    :visible="lightboxVisible"
    @hide="hideLightbox"
    @on-index-change="slideChanged"
  />
</template>

<script>
import { ref } from "vue";
import VueEasyLightBox from "vue-easy-lightbox";
import disableScroll from "disable-scroll";

import { Carousel } from "./carousel";

import slide1 from "../assets/slide_1.jpg";
import slide2 from "../assets/slide_2.jpg";
import slide3 from "../assets/slide_3.jpg";
import slide4 from "../assets/slide_4.jpg";
import slide5 from "../assets/slide_5.jpg";
import slide6 from "../assets/slide_6.jpg";
import slide7 from "../assets/slide_7.jpg";
import slide8 from "../assets/slide_8.jpg";
import slide9 from "../assets/slide_9.jpg";
import slide10 from "../assets/slide_10.jpg";
import slide11 from "../assets/slide_11.jpg";
import slide12 from "../assets/slide_12.jpg";
import slide13 from "../assets/slide_13.jpg";
import slide14 from "../assets/slide_14.jpg";
import slide15 from "../assets/slide_15.jpg";
import slide16 from "../assets/slide_16.jpg";
import slide17 from "../assets/slide_17.jpg";
import slide18 from "../assets/slide_18.jpg";
import slide19 from "../assets/slide_19.jpg";
import slide20 from "../assets/slide_20.jpg";

import thumb1 from "../assets/slide_1_thumb.jpg";
import thumb2 from "../assets/slide_2_thumb.jpg";
import thumb3 from "../assets/slide_3_thumb.jpg";
import thumb4 from "../assets/slide_4_thumb.jpg";
import thumb5 from "../assets/slide_5_thumb.jpg";
import thumb6 from "../assets/slide_6_thumb.jpg";
import thumb7 from "../assets/slide_7_thumb.jpg";
import thumb8 from "../assets/slide_8_thumb.jpg";
import thumb9 from "../assets/slide_9_thumb.jpg";
import thumb10 from "../assets/slide_10_thumb.jpg";
import thumb11 from "../assets/slide_11_thumb.jpg";
import thumb12 from "../assets/slide_12_thumb.jpg";
import thumb13 from "../assets/slide_13_thumb.jpg";
import thumb14 from "../assets/slide_14_thumb.jpg";
import thumb15 from "../assets/slide_15_thumb.jpg";
import thumb16 from "../assets/slide_16_thumb.jpg";
import thumb17 from "../assets/slide_17_thumb.jpg";
import thumb18 from "../assets/slide_18_thumb.jpg";
import thumb19 from "../assets/slide_19_thumb.jpg";
import thumb20 from "../assets/slide_20_thumb.jpg";

export default {
  name: "Portfolio",
  components: { Carousel, VueEasyLightBox },
  setup() {
    const images = ref([
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6,
      slide7,
      slide8,
      slide9,
      slide10,
      slide11,
      slide12,
      slide13,
      slide14,
      slide15,
      slide16,
      slide17,
      slide18,
      slide19,
      slide20,
    ]);
    const thumbs = ref([
      thumb1,
      thumb2,
      thumb3,
      thumb4,
      thumb5,
      thumb6,
      thumb7,
      thumb8,
      thumb9,
      thumb10,
      thumb11,
      thumb12,
      thumb13,
      thumb14,
      thumb15,
      thumb16,
      thumb17,
      thumb18,
      thumb19,
      thumb20,
    ]);
    const index = ref(0);
    const lightboxVisible = ref(false);
    const autoplay = ref(true);
    const carousel = ref(null);

    function showLightbox() {
      index.value = carousel.value.getCurrentSlide();
      lightboxVisible.value = true;
      autoplay.value = false;
      disableScroll.on();
    }

    function hideLightbox() {
      lightboxVisible.value = false;
      autoplay.value = true;
      disableScroll.off();
    }

    function slideChanged(oldIndex, newIndex) {
      carousel.value.goTo(newIndex);
    }

    return {
      images,
      thumbs,
      index,
      lightboxVisible,
      autoplay,
      carousel,
      showLightbox,
      hideLightbox,
      slideChanged,
    };
  },
};
</script>

<style scoped>
img {
  margin: auto;
}
</style>
