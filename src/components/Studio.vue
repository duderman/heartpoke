<template>
  <h1 class="mb-2">Studio</h1>

  <div class="text-2xl">Blank Collective</div>
  <div>Unit 1, 82-84 Childers Street London, United Kingdom SE8 5FS</div>

  <iframe id="studio-map" ref="iframe" class="w-screen mt-5 h-96" />
</template>

<script>
const STUDIO_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.689333625457!2d-0.037129584273627315!3d51.482216520365306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876031dd4b0b3e7%3A0xac53eca7a1c407e3!2sBlank%20Collective!5e0!3m2!1sen!2s!4v1662997414757!5m2!1sen!2s";
export default {
  name: "Studio",
  mounted() {
    this.$refs.iframe.src = STUDIO_MAP_SRC;
  },
};
</script>

<style scoped>
#studio-map {
  min-height: 450px;
}
</style>
