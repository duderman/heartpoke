<template>
  <section id="book" ref="bookRef" class="mx-7 my-5">
    <h1 class="my-10">Book</h1>
    <p>
      If you want to sign up for a session with me, you must fill out this form.
      I will contact you back by e-mail to clarify additional information if needed and with information about price and
      my availability.
    </p>
    <p class="text-gray-400 mt-2">
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
          :type="config.spec.meta?.inputType || config.type">
        {{ config.spec.meta?.disclaimer }}
      </BookInput>
      <div class="my-4">
        <h2>References</h2>
        <p>
          Don’t hesitate to attach the photographs of works that I have already completed that you liked,
          any images or illustrations that could help with designing.
        </p>
        <FileSelect name="references"/>
      </div>
      <Button text="Book now" @click="bookBtnClicked(values)"/>
    </Form>
  </section>
</template>

<script>
import BookInput from './BookInput.vue'
import FileSelect from "./FileSelect.vue";
import Button from "./Button.vue";
import {Form} from 'vee-validate';
import * as yup from 'yup';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

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

import {inject, ref} from 'vue'

export default {
  name: "Book",
  components: {BookInput, FileSelect, Button, Form},
  setup() {
    const bookRef = ref(null)
    const smoothScroll = inject('smoothScroll')
    const scrollToBook = () => {
      smoothScroll({
        scrollTo: bookRef.value,
        hash: '#book'
      })
    }

    return {bookRef, scrollToBook}
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
      size: yup.number().required().label("Approximate Size (in cm)"),
      description: yup.string().required().label("Tattoo description").meta({
        inputType: 'textarea',
        disclaimer: descriptionDisclaimer
      }),
      comments: yup.string().label("Additional Comments").meta({inputType: 'textarea'}),
    });
    const initialValues = {
      dob: maxDate,
      size: 5
    }
    return {schema, initialValues}
  },
  methods: {
    async bookBtnClicked(values) {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        console.log('valid', values)
      } else {
        this.scrollToBook()
      }
    }
  }
}
</script>

<style scoped>

</style>