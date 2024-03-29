<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <div class="mt-3">
    <label :for="name"> {{ label }}<span v-if="required"> *</span></label>
    <p class="my-1 text-gray-500">
      <slot />
    </p>
    <Field v-slot="{ field, handleChange }" :name="name">
      <component
        :is="tag"
        v-bind="field"
        :class="classes"
        :name="name"
        :max="max"
        :placeholder="placeholder"
        :type="inputType"
        @change="handleChange"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </component>
    </Field>
    <ErrorMessage :name="name" class="text-red-500" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";

export default {
  name: "BookInput",
  components: { Field, ErrorMessage },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: "input",
    },
    inputType: {
      type: String,
      default: "text",
    },
    // eslint-disable-next-line vue/require-default-prop
    max: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      classes:
        "my-2 w-full rounded-lg h-10 text-gray-700 px-3 shadow-lg border py-2",
    };
  },
};
</script>

<style scoped>
input:focus,
textarea:focus,
select:focus {
  @apply outline-none;
  @apply border-pink-700;

  --tw-shadow: 0 10px 15px -3px rgba(183, 26, 92, 0.2),
    0 4px 6px -2px rgba(183, 26, 92, 0.1);
  --tw-border-opacity: 0.3;
}

textarea {
  @apply h-40;
}

input {
  @apply h-10;
}

input,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
