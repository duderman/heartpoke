import { createApp } from 'vue'
import VueSmoothScroll from 'vue3-smooth-scroll'
import VueAgile from './vue-agile'

import App from './App.vue'
import './index.css'

createApp(App)
    .use(VueSmoothScroll)
    .use(VueAgile)
    .mount('#app')
