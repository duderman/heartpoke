import { createApp } from "vue";
import VueSmoothScroll from "vue3-smooth-scroll";
import VueEasyLightBox from "vue-easy-lightbox";
import Carousel from "./components/carousel";
import { VueReCaptcha } from "vue-recaptcha-v3";
import { Notifier } from "@airbrake/browser";

import App from "./App.vue";
import "./index.css";

// noinspection JSCheckFunctionSignatures,SpellCheckingInspection
const app = createApp(App)
  .use(VueSmoothScroll, { offset: -20 })
  .use(Carousel)
  .use(VueEasyLightBox)
  .use(VueReCaptcha, { siteKey: "6LdzI5caAAAAABGKERpWx2URDf9Tye0KE2odzJVB" });

export const airbrake = new Notifier({
  environment: "production",
  projectId: 506141,
  projectKey: "37bbc487deaf0267f7a24cf1aca71339",
});

airbrake.addFilter((notice) => {
  if (notice.context.environment !== "production") {
    return null;
  }
  return notice;
});

app.config.errorHandler = (error, _vm, info) => {
  // noinspection JSIgnoredPromiseFromCall
  airbrake.notify({
    error,
    params: { info },
  });
};

app.mount("#app");
