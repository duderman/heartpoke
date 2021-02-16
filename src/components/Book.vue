<template>
  <section id="book" class="mx-7 my-5 max-w-md">
    <h1 class="my-10">Book</h1>
    <p>
      If you want to sign up for a session with me, you must fill out this form.
      I will contact you back by e-mail to clarify additional information if needed and with information about price and
      my availability.
    </p>
    <p>
      It is important for me to understand the idea of your tattoo, so the more specifically you describe all the
      nuances that are important to you, the easier it will be for us to work
    </p>
    <p class="text-gray-400 mt-2">
      Please understand that I can decline your idea if it doesn’t suit my style of drawing and/or tattooing.
    </p>
    <BookInput label="Full Name" name="name"/>
    <BookInput :max="maxDate" :value="maxDate" label="Date of Birth" name="dob" type="date"/>
    <BookInput label="Your Email" name="email" type="email"/>
    <BookInput label="Tattoo Placement" name="placement"/>
    <BookInput label="Approximate Size (In Cm)" name="size" type="number" value="5"/>
    <BookInput label="Tattoo description" name="description" type="textarea">
      It is important for me to understand the idea of your tattoo, so the more specifically you describe all the
      nuances that are important to you, the easier it will be for us to work
    </BookInput>
    <BookInput :required="false" label="Additional Comments" name="comments" type="textarea"/>
    <div class="my-4">
      <h2>References</h2>
      <p>
        Don’t hesitate to attach the photographs of works that I have already completed that you liked,
        any images or illustrations that could help with designing.
      </p>
      <FileSelect/>
    </div>
    <Button text="Book now"/>
  </section>
</template>

<script>
import BookInput from './BookInput.vue'
import FileSelect from "./FileSelect.vue";
import Button from "./Button.vue";

function getMaxDate() {
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() - 18)
  return maxDate.toISOString().split('T')[0]
}

export default {
  name: "Book",
  components: {BookInput, FileSelect, Button},
  setup() {
    const maxDate = getMaxDate()
    return {maxDate}
  }
}
</script>

<style scoped>

</style>