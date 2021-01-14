import Carousel from './Carousel.vue'

const install = (Vue) => {
	Vue.component('carousel', Carousel)
}

export default {
	install
}

export {Carousel}
