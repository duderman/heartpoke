<template>
  <div v-if="files.length > 0" class="rounded-lg shadow-lg border py-5 mt-5">
    <h3>Files Selected: </h3>
    <div v-for="file of files" class="my-2">{{ file.name }}</div>
    <a class="underline cursor-pointer" v-on:click="clearFiles">Clear selection ⒳</a>
  </div>
  <div v-else class="flex w-full items-center justify-center bg-black mt-4">
    <label
        class="w-full flex flex-col items-center px-4 py-6 bg-black text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
      </svg>
      <p class="mt-2 text-base leading-normal">Select references</p>
      <p class="text-gray-500 text-sm">(up to 3 files)</p>
      <p v-if="tooManyFiles" class="text-red-800">Sorry that's too many files</p>
      <input ref="fileInput" accept="image/*" class="hidden" multiple type='file' v-on:change="setFiles"/>
    </label>
  </div>
</template>

<script>
import {ref} from 'vue'

const MAX_FILES = 3

export default {
  name: "FileSelect",
  setup() {
    const tooManyFiles = ref(false)
    return {tooManyFiles}
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    setFiles: function (event) {
      const files = event.target.files;
      if (files.length > MAX_FILES) {
        this.tooManyFiles = true
      } else {
        this.tooManyFiles = false
        this.files = files
      }
    },
    clearFiles: function () {
      this.files = []
      this.$refs.fileInput.value = null
    }
  }
}
</script>

<style scoped>

</style>