import {createApp} from 'vue'
import VueSmoothScroll from 'vue3-smooth-scroll'
import VueEasyLightBox from "vue-easy-lightbox";
import Carousel from './components/carousel'
import {VueReCaptcha} from 'vue-recaptcha-v3'

import App from './App.vue'
import './index.css'

// noinspection JSCheckFunctionSignatures
createApp(App)
  .use(VueSmoothScroll, {offset: -20})
  .use(Carousel)
  .use(VueEasyLightBox)
  .use(VueReCaptcha, {siteKey: "6LdzI5caAAAAABGKERpWx2URDf9Tye0KE2odzJVB"})
  .mount('#app')
