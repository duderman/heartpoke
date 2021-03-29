<template>
  <h1 class="mt-20">Why hand poke</h1>
  <div v-for="({icon, header, effect}, index) in whys" :key="index" :data-aos="effect" class="mt-10 px-10">
    <div class="px-8">
      <component :is="icon"/>
    </div>
    <h2 class="mt-5">{{ header }}</h2>
  </div>
</template>

<script>
import BandAid from "./icons/BandAid.vue"
import Pain from "./icons/Pain.vue"
import Crutch from "./icons/Crutch.vue"

export default {
  name: "Why",
  components: {BandAid, Pain, Crutch},
  setup() {
    const whys = [
      {
        icon: BandAid,
        header: 'Faster healing',
        effect: 'fade-left'
      },
      {
        icon: Pain,
        header: 'Less painful process',
        effect: 'fade-right'
      },
      {
        icon: Crutch,
        header: 'Less traumatic for skin',
        effect: 'fade-left'
      }
    ]
    return {whys}
  },
}
</script>
