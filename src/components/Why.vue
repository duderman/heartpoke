<template>
  <h1 class="mt-20">Why handpoke you ask?</h1>
  <div v-for="(why, index) in whys" :key="index" class="mt-10 px-10">
    <div class="px-8">
      <component :is="why.icon"/>
    </div>
    <h2 class="mt-5">{{ why.header }}</h2>
    <p class="mt-3">{{ why.description }}</p>
  </div>
</template>

<script>
import BandAid from "./icons/BandAid.vue"
import Pain from "./icons/Pain.vue"


export default {
  name: "Why",
  components: {BandAid, Pain},
  setup() {
    const whys = [
      {
        icon: BandAid,
        header: 'Heals fast',
        description: 'Who can discover the uniqueness and futility of a lover if he has the eternal shame of the karma?'
      },
      {
        icon: Pain,
        header: 'Less painful',
        description: 'The shining sex of intuition is to forget with samadhi.'
      }
    ]
    return {whys}
  }
}
</script>
