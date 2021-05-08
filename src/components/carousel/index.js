import Carousel from "./Carousel.vue";

const install = (Vue) => {
  Vue.component("Carousel", Carousel);
};

export default {
  install,
};

export { Carousel };
