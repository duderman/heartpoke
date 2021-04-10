<template>
  <div class="mt-3">
    <label :for="name"> {{ label }}<span v-if="required"> *</span></label>
    <p class="my-1 text-gray-300">
      <slot/>
    </p>
    <Field v-slot="{ field, handleChange }" :name="name">
      <textarea
          v-if="type === 'textarea'"
          v-bind="field"
          :class="classes"
          :name="name"
          @change="handleChange">
      </textarea>
      <input
          v-else
          v-bind="field"
          :class="classes"
          :max="max"
          :name="name"
          :placeholder="placeholder"
          :type="type"
          @change="handleChange"
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
      classes: "mt-2 w-full rounded-lg h-10 text-gray-700 px-3 shadow-lg border"
    }
  }
}
</script>

<style scoped>
input:focus,textarea:focus {
  @apply outline-none;
  @apply border-pink-700;
  --tw-shadow: 0 10px 15px -3px rgba(183, 26, 92, 0.2), 0 4px 6px -2px rgba(183, 26, 92, 0.1);
  --tw-border-opacity: 0.3;
}

textarea {
  @apply h-40
}

input {
  @apply h-10
}
</style>