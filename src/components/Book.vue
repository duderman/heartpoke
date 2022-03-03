<template>
  <section id="book" ref="bookRef" class="px-7">
    <h1>Book</h1>

    <div v-if="isBookingClosed" class="text-xl">
      <p>
        Thank you for being interested in my art! Unfortunately booking is
        closed at the moment (consultations are also unavailable). Please wait
        for the updates in my
        <Link url="https://www.instagram.com/heart.poke/"> Instagram </Link>
      </p>
      <p class="mt-5 text-pink-600">With love, Katie 💖</p>
    </div>
    <div v-else-if="bookedSuccessfully" class="my-20">
      <div class="rounded-lg shadow-lg border py-5 mt-5 border-pink-700">
        <p class="text-2xl">Thank you for your booking!</p>
        <p class="text-lg">I'll be in touch shortly</p>
        <Heart class="h-20 m-auto mt-5" />
      </div>
    </div>
    <div v-else>
      <p>
        If you want to sign up for a session with me, you must fill out this
        form. I will contact you back by e-mail to clarify additional
        information if needed and with information about price and my
        availability.
      </p>
      <p class="text-gray-500 mt-2">
        Please understand that I can decline your idea if it doesn't suit my
        style of drawing and/or tattooing.
      </p>
      <Form
        ref="form"
        v-slot="{ values }"
        :initial-values="initialValues"
        :validation-schema="schema"
      >
        <BookInput
          v-for="(config, name) in schema.fields"
          :key="name"
          :label="config.spec.label"
          :max="config.spec.meta?.max"
          :name="name"
          :placeholder="config.spec.meta?.placeholder"
          :options="config.spec.meta?.options"
          :required="config.spec.presence === 'required'"
          :tag="config.spec.meta?.tag"
          :input-type="config.spec.meta?.inputType"
          @change="valueChanged(values)"
        >
          {{ config.spec.meta?.disclaimer }}
        </BookInput>
        <div class="my-4">
          <div class="text-3xl mb-2">References</div>
          <p>
            Don’t hesitate to attach the photographs of works that I have
            already completed that you liked, any images or illustrations that
            could help with designing.
          </p>
          <FileSelect
            ref="referencesInput"
            @uploading-started="uploadingStarted"
            @uploading-finished="uploadingFinished"
          />
        </div>
        <div class="mt-3 mb-3">
          <input
            id="toc"
            ref="toc"
            type="checkbox"
            @change="() => (tocError = false)"
          />
          <label for="toc">
            I’ve carefully read
            <Link
              url="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTAwOTMzMzA1MzM5MzI0?story_media_id=2740950280852036870"
              >Instagram highlight F.A.Q.</Link
            ></label
          >
          <div :class="{ ninja: !tocError }" class="text-red-500">
            <p>You must accept it first</p>
          </div>
        </div>
        <Button
          :disabled="isInvalid || isWaiting"
          :loading="isWaiting"
          @click="(e) => bookBtnClicked(e, values)"
        >
          Book now
        </Button>
        <ConfirmDialogue ref="confirmDialogue" />
        <div :class="{ ninja: !bookingFailed }" class="text-red-500 mt-5">
          <p class="text-2xl">Something went wrong :(</p>
          <p>Try again in a couple of minutes</p>
        </div>
      </Form>
    </div>
  </section>
</template>

<script>
import { inject, ref } from "vue";
import * as yup from "yup";
import { useReCaptcha } from "vue-recaptcha-v3";
import axios from "axios";

import BookInput from "./BookInput.vue";
import FileSelect from "./FileSelect.vue";
import Button from "./Button.vue";
import Link from "./Link.vue";
import ConfirmDialogue from "./ConfirmDialogue.vue";
import Heart from "./HeartIcon.vue";

import { Form } from "vee-validate";

import { airbrake } from "../main";

let bookingFailedTimeout;

function eighteenYearsAgoDate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d;
}

function getMaxDate() {
  const maxDate = eighteenYearsAgoDate();
  return maxDate.toISOString().split("T")[0];
}

function testAge(dob) {
  const dobDate = new Date(dob);
  return dobDate < eighteenYearsAgoDate();
}

export default {
  name: "Book",
  components: {
    BookInput,
    FileSelect,
    Button,
    Form,
    Heart,
    Link,
    ConfirmDialogue,
  },
  setup() {
    const bookRef = ref(null);
    const smoothScroll = inject("smoothScroll");
    const scrollToBook = () => {
      smoothScroll({
        scrollTo: bookRef.value,
        hash: "#book",
      });
    };
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

    const recaptcha = async () => {
      await recaptchaLoaded();
      await executeRecaptcha("booking");
    };

    const isWaiting = ref(false);
    const isInvalid = ref(true);
    const bookedSuccessfully = ref(false);
    const bookingFailed = ref(false);
    const tocError = ref(false);
    const isBookingClosed = true;

    return {
      bookRef,
      scrollToBook,
      recaptcha,
      isWaiting,
      isInvalid,
      bookedSuccessfully,
      bookingFailed,
      tocError,
      isBookingClosed,
    };
  },
  data() {
    const maxDate = getMaxDate();
    const descriptionDisclaimer =
      "It is important for me to understand the idea of your tattoo, so the more specifically you describe all the" +
      "nuances that are important to you, the easier it will be for us to work";
    const schema = yup.object({
      name: yup
        .string()
        .required()
        .label("Full Name")
        .meta({ placeholder: "John Doe" }),
      dob: yup
        .string()
        .required()
        .test("oldEnough", "You should be 18+ years old", testAge)
        .meta({ max: maxDate, inputType: "date" })
        .label("Date of Birth"),
      email: yup
        .string()
        .required()
        .email()
        .label("Your Email")
        .meta({ placeholder: "email@example.com" }),
      email_confirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("email"), null], "Emails must match")
        .email()
        .label("Email confirmation")
        .meta({ placeholder: "email@example.com" }),
      placement: yup.string().required().label("Tattoo Placement").meta({
        placeholder: "Shoulder, Ankle, etc",
        disclaimer:
          "(please keep in mind that I’m not accepting enquiries for stomach and rib tattoos if it’s not a part of my “wannado” concepts)",
      }),
      size: yup
        .string()
        .required()
        .label("Approximate Size (in cm)")
        .meta({ placeholder: "3-5 cm" }),
      description: yup.string().required().label("Tattoo description").meta({
        tag: "textarea",
        disclaimer: descriptionDisclaimer,
      }),
      comments: yup
        .string()
        .label("Additional Comments")
        .meta({ tag: "textarea" }),
      technique: yup
        .string()
        .required()
        .label("Preferable tattooing technique ")
        .meta({
          tag: "select",
          options: ["Artist's choice", "Hand poke", "Machine"],
        }),
    });
    const initialValues = {
      dob: maxDate,
      technique: "Artist's choice",
    };
    return { schema, initialValues };
  },
  methods: {
    async bookBtnClicked(e, values) {
      e.preventDefault();
      e.stopImmediatePropagation();

      if (!this.$refs.toc.checked) {
        this.tocError = true;
        return false;
      }

      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.isWaiting = true;
        this.isInvalid = true;
        try {
          const references = [...this.$refs.referencesInput.urls];

          if (references.length === 0) {
            const ok = await this.$refs.confirmDialogue.show({
              title: "Send Form?",
              message:
                "Are you sure you want to submit form without references",
              okButton: "Yes",
            });

            if (!ok) {
              return false;
            }
          }

          await this.recaptcha();

          const params = { ...values, references };

          if (process.env.NODE_ENV !== "development") {
            await axios.post("https://heartpoke.co.uk/api/book", params);
          }

          this.bookedSuccessfully = true;
          this.scrollToBook();
        } catch (e) {
          console.error(e);
          // noinspection ES6MissingAwait
          airbrake.notify(e);
          this.showError();
        } finally {
          this.isWaiting = false;
          this.isInvalid = false;
        }
      } else {
        this.scrollToBook();
      }

      return false;
    },
    valueChanged(currentValues) {
      this.isInvalid = !this.schema.isValidSync(currentValues);
    },
    showError() {
      this.bookingFailed = true;
      if (bookingFailedTimeout) {
        clearTimeout(bookingFailedTimeout);
      }
      bookingFailedTimeout = setTimeout(() => {
        this.bookingFailed = false;
      }, 5000);
    },
    uploadingStarted() {
      this.isWaiting = true;
    },
    uploadingFinished() {
      this.isWaiting = false;
    },
  },
};
</script>

<style scoped>
.ninja {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}
</style>
