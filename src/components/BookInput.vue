<template>
  <div class="mt-3">
    <label :for="name"> {{ label }}<span v-if="required"> *</span></label>
    <p class="my-1 text-gray-300">
      <slot/>
    </p>
    <textarea
        v-if="type == 'textarea'"
        :name="name"
        :required="required"
        class="mt-2 w-full rounded h-40 text-gray-700 p-3">
    </textarea>
    <input
        v-else
        :max="max"
        :min="min"
        :name="name"
        :required="required"
        :type="type"
        :value="value"
        class="mt-2 w-full rounded h-10 text-gray-700 px-3"
    />
  </div>
</template>

<script>
export default {
  name: "BookInput",
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
    min: {
      type: String
    },
    max: {
      type: String
    },
    value: {
      type: String
    },
    disclaimer: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>