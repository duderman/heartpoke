<template>
  <a v-smooth-scroll :href="url">
    <span class="scroll-icon" />
  </a>
</template>

<script>
export default {
  name: "ArrowDown",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
@keyframes scrollDown {
  0% {
    transform: rotate(-45deg) translate(20px, -20px);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: rotate(-45deg) translate(0, 0);
    opacity: 0;
  }
}

.scroll-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
  animation: scrollDown 1.5s infinite;
  box-sizing: border-box;
}
</style>
