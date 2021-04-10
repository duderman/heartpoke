import {createApp} from 'vue'
import VueSmoothScroll from 'vue3-smooth-scroll'
import VueEasyLightBox from "vue-easy-lightbox";
import Carousel from './components/carousel'
import {VueReCaptcha} from 'vue-recaptcha-v3'
import {Notifier} from '@airbrake/browser';

import App from './App.vue'
import './index.css'

// noinspection JSCheckFunctionSignatures
const app = createApp(App)
  .use(VueSmoothScroll, {offset: -20})
  .use(Carousel)
  .use(VueEasyLightBox)
  .use(VueReCaptcha, {siteKey: "6LdzI5caAAAAABGKERpWx2URDf9Tye0KE2odzJVB"})

// const airbrake = new Notifier({
//   environment: 'production',
//   projectId: 328313,
//   projectKey: '8baa31e65729a99d9aa04b72ef8dd9ee'
// });
//
// app.config.errorHandler = (error, _vm, info) => {
//   airbrake.notify({
//     error,
//     params: {info}
//   });
// }

app.mount('#app')
