<template>
  <svg
    viewBox="0 0 24 24"
    x="0px"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    y="0px"
  >
    <g style="fill: #b71a5c">
      <path
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
      />
    </g>
    text
  </svg>
</template>

<script>
export default {
  name: "HeartIcon",
};
</script>

<style scoped>
@keyframes heartbeat {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  20% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  30% {
    opacity: 0;
  }

  70% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  85% {
    opacity: 1;
  }

  90% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

svg {
  animation: heartbeat 5s ease infinite;
}
</style>
