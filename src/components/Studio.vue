<template>
  <h1>Studio</h1>
  <h2>VaporWave Tattoo</h2>
  <h3>5 Crown Works, Temple Street, London E2 6QQ</h3>

  <iframe
      id="studio-map"
      class="w-screen mt-5 h-96"
      ref="iframe"
  >
  </iframe>
</template>

<script>
const STUDIO_MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.0490280892845!2d-0.06281794870226565!3d51.53066057953909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d80e8f1a3f3%3A0x424810f9b823e47b!2sVaporwave%20Studios!5e0!3m2!1sen!2suk!4v1613521689253!5m2!1sen!2suk"
export default {
  name: "Studio",
  mounted() {
    this.$refs.iframe.src = STUDIO_MAP_SRC
  }
}
</script>

<style scoped>
#studio-map {
  min-height: 450px;
}
</style>