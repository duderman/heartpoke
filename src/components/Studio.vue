<template>
  <h1 class="mb-2">Studio</h1>

  <div class="text-2xl">Sixty Ink</div>
  <div>First Floor, 28 Denmark St, London WC2H 8NJ</div>

  <iframe id="studio-map" ref="iframe" class="w-screen mt-5 h-96" />
</template>

<script>
const STUDIO_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8709898152883!2d-0.12900879999999998!3d51.5155828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b1e8c4216ed%3A0xa932b5be899c751d!2sSixty%20Ink!5e0!3m2!1sen!2sru!4v1657404087554!5m2!1sen!2sru";
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
