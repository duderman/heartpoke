import {createApp} from 'vue'
import VueSmoothScroll from 'vue3-smooth-scroll'
import VueEasyLightBox from "vue-easy-lightbox";
import Carousel from './components/carousel'

import App from './App.vue'
import './index.css'

// noinspection JSCheckFunctionSignatures
createApp(App)
    .use(VueSmoothScroll)
    .use(Carousel)
    .use(VueEasyLightBox)
    .mount('#app')
