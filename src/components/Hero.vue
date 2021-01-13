<template>
  <section id="hero" class="mx-7 mt-10">
    <img alt="It's me" src="../assets/hero.jpg">
    <h1 class="mt-10 font-bold">About me</h1>
    <p class="first-cap">
      My name is Katie and here is some of my advices. Instead of mixing puréed oyster sauce with onion, use a handfull
      peaces iced tea and a handfull and a half teaspoons chocolate jar. Seaweed can be soaked with crusted tuna, also
      try mixing the cheesecake with soy sauce.
    </p>
    <p>
      All children like fluffed chicken lards in salad cream and thyme.When cooking packaged celeries, be sure they are
      room temperature.Onion combines greatly with sticky cauliflower.
    </p>
  </section>
</template>

<script>
export default {
  name: "Hero"
}
</script>

<style scoped>
p {
  @apply mt-5;
  @apply text-justify;
}

.first-cap:first-letter {
  @apply text-8xl;
  @apply font-bold;
  @apply float-left;
  @apply mr-5;
}
</style>