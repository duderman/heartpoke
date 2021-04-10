<template>
  <section id="book" ref="bookRef" class="mx-7 mt-5">
    <div v-if="bookedSuccessfully" class="my-20">
      <div class="rounded-lg shadow-lg border py-5 mt-5 border-pink-700">
        <p class="text-2xl">Thank you for your booking!</p>
        <p class="text-lg">I'll be in touch shortly</p>
        <Heart class="h-20 m-auto mt-5"/>
      </div>
    </div>
    <div v-else>
      <h1 class="my-10">Book</h1>
      <p>
        If you want to sign up for a session with me, you must fill out this form.
        I will contact you back by e-mail to clarify additional information if needed and with information about price
        and
        my availability.
      </p>
      <p class="text-gray-500 mt-2">
        Please understand that I can decline your idea if it doesn’t suit my style of drawing and/or tattooing.
      </p>
      <Form ref="form" v-slot="{values}" :initial-values="initialValues" :validation-schema="schema">
        <BookInput
            v-for="(config, name) in schema.fields"
            :key="name"
            :label="config.spec.label"
            :max="config.spec.meta?.max"
            :name="name"
            :placeholder="config.spec.meta?.placeholder"
            :required="config.spec.presence === 'required'"
            :type="config.spec.meta?.inputType || config.type"
            @change="valueChanged(values)">
          {{ config.spec.meta?.disclaimer }}
        </BookInput>
        <div class="my-4">
          <h2>References</h2>
          <p>
            Don’t hesitate to attach the photographs of works that I have already completed that you liked,
            any images or illustrations that could help with designing.
          </p>
          <FileSelect ref="referencesInput" name="references"/>
        </div>
        <Button :disabled="isInvalid" :loading="isWaiting" @click="bookBtnClicked(values)">
          Book now
        </Button>
        <div :class="{ninja: !bookingFailed}" class="text-red-500 mt-5">
          <p class="text-2xl">Something went wrong :(</p>
          <p>Try again in a couple of minutes</p>
        </div>
      </Form>
    </div>
  </section>
</template>

<script>
import {inject, ref} from 'vue'
import * as yup from 'yup';
import {useReCaptcha} from 'vue-recaptcha-v3'
import axios from 'axios'

import BookInput from './BookInput.vue'
import FileSelect from "./FileSelect.vue";
import Button from "./Button.vue";
import {Form} from 'vee-validate';

import Heart from "./HeartIcon.vue";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
let bookingFailedTimeout

function eighteenYearsAgoDate() {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 18)
  return d
}

function getMaxDate() {
  const maxDate = eighteenYearsAgoDate()
  return maxDate.toISOString().split('T')[0]
}

function testAge(dob) {
  const dobDate = new Date(dob)
  return dobDate < eighteenYearsAgoDate()
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default {
  name: "Book",
  components: {BookInput, FileSelect, Button, Form, Heart},
  setup() {
    const bookRef = ref(null)
    const smoothScroll = inject('smoothScroll')
    const scrollToBook = () => {
      smoothScroll({
        scrollTo: bookRef.value,
        hash: '#book'
      })
    }
    const {executeRecaptcha, recaptchaLoaded} = useReCaptcha()

    const recaptcha = async () => {
      await recaptchaLoaded()
      await executeRecaptcha('booking')
    }

    const isWaiting = ref(false)
    const isInvalid = ref(true)
    const bookedSuccessfully = ref(false)
    const bookingFailed = ref(false)

    return {bookRef, scrollToBook, recaptcha, isWaiting, isInvalid, bookedSuccessfully, bookingFailed}
  },
  data() {
    const maxDate = getMaxDate()
    const descriptionDisclaimer = "It is important for me to understand the idea of your tattoo, so the more specifically you describe all the" +
        "nuances that are important to you, the easier it will be for us to work"
    const schema = yup.object({
      name: yup.string().required().label("Full Name").meta({placeholder: 'John Doe'}),
      dob: yup.string().required()
          .test('oldEnough', 'You should be 18+ years old', testAge)
          .meta({max: maxDate, inputType: 'date'})
          .label("Date of Birth"),
      email: yup.string().required().email().label("Your Email").meta({placeholder: 'email@example.com'}),
      placement: yup.string().required().label("Tattoo Placement").meta({placeholder: 'Shoulder, Ankle, etc'}),
      size: yup.string().required().label("Approximate Size (in cm)").meta({placeholder: '5-7'}),
      description: yup.string().required().label("Tattoo description").meta({
        inputType: 'textarea',
        disclaimer: descriptionDisclaimer
      }),
      comments: yup.string().label("Additional Comments").meta({inputType: 'textarea'}),
    });
    const initialValues = {
      dob: maxDate
    }
    return {schema, initialValues}
  },
  methods: {
    async bookBtnClicked(values) {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.isWaiting = true
        this.isInvalid = true
        try {
          await this.recaptcha()

          let params = {...values, references: []}
          for (const f of this.$refs.referencesInput.files) {
            const b64 = await fileToBase64(f)
            params.references.push(b64)
          }

          const {data} = await axios.post("https://heartpoke.co.uk/book", params)
          if (data.statusCode !== 200) {
            throw data
          }
          this.bookedSuccessfully = true
        } catch {
          this.showError()
        } finally {
          this.isWaiting = false
          this.isInvalid = false
        }
      } else {
        this.scrollToBook()
      }
    },
    valueChanged(currentValues) {
      this.isInvalid = !this.schema.isValidSync(currentValues)
    },
    showError() {
      this.bookingFailed = true
      if (bookingFailedTimeout) {
        clearTimeout(bookingFailedTimeout)
      }
      bookingFailedTimeout = setTimeout(() => {
        this.bookingFailed = false
      }, 5000)
    }
  },
}
</script>

<style scoped>
.ninja {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}
</style>