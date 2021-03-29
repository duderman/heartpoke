<template>
  <div class="mt-3">
    <label :for="name"> {{ label }}<span v-if="required"> *</span></label>
    <p class="my-1 text-gray-300">
      <slot/>
    </p>
    <Field v-slot="{ field }" :name="name">
      <textarea
          v-if="type === 'textarea'"
          v-bind="field"
          :class="classes"
          :name="name">
      </textarea>
      <input
          v-else
          v-bind="field"
          :class="classes"
          :max="max"
          :name="name"
          :placeholder="placeholder"
          :type="type"
      />
    </Field>
    <ErrorMessage :name="name" class="text-red-500"/>
  </div>
</template>

<script>
import {Field, ErrorMessage} from 'vee-validate';

export default {
  name: "BookInput",
  components: {Field, ErrorMessage},
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    required: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "text"
    },
    max: {
      type: String
    },
    placeholder: {
      type: String
    },
  },
  data() {
    return {
      classes: "mt-2 w-full rounded h-10 text-gray-700 px-3"
    }
  }
}
</script>

<style scoped>
textarea {
  @apply h-40
}

input {
  @apply h-10
}
</style>