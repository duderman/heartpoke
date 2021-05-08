<template>
  <div ref="test">asdasdasd</div>
  <div v-if="files.length > 0" class="rounded-lg shadow-lg border py-5 mt-5">
    <h3>Files Selected: </h3>
    <div v-for="file of files" class="my-2 filename" :ref="file.name">{{ file.name }}</div>
    <a class="underline cursor-pointer" v-on:click="clearFiles">Clear selection ⒳</a>
  </div>
  <div v-else class="flex w-full items-center justify-center bg-white mt-4">
    <label
        class="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-pink-700">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
      </svg>
      <p class="mt-2 text-base leading-normal">Select references</p>
      <p class="text-gray-500 text-sm">(up to 3 files)</p>
      <p v-if="tooManyFiles" class="text-red-800">Sorry that's too many files</p>
      <p v-if="uploadError" class="text-red-800">Sorry. Something went wrong when uploading. Try again in a couple of minutes</p>
      <input accept="image/*" class="hidden" multiple type='file' v-on:change="setFiles"/>
    </label>
  </div>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";
import {airbrake} from "../main";

const MAX_FILES = 3
const PRESIGN_API_PATH = "https://heartpoke.co.uk/api/presign"

const uploadToS3 = async (img, url, onProgress) => {
  const options = {
    headers: { 'Content-Type': img.type },
    onUploadProgress: ({loaded, total}) => onProgress(Math.round(loaded / total * 90) + 10)
  }
  await axios.put(url, img, options)
}

const getS3Url = async (img) => {
  const matches = img.name.match(/\.([a-zA-Z0-9]+)$/)
  const extension = (matches) ? matches[1] : 'jpg'
  const presignResponse = await axios.post(PRESIGN_API_PATH, { extension })
  return presignResponse.data
}

const uploadImage = async (img, onProgress) => {
  const {url, key} = await getS3Url(img)
  await uploadToS3(img, url, onProgress)
  return `https://heartpoke.co.uk/${key}`
}

export default {
  name: "FileSelect",
  setup() {
    const tooManyFiles = ref(false)
    const uploadError = ref(false)
    return {tooManyFiles, uploadError}
  },
  data() {
    return {
      files: [],
      urls: []
    }
  },
  emits: ['uploading-started', 'uploading-finished'],
  methods: {
    setFiles: function (event) {
      this.uploadError = false

      const files = [...event.target.files];
      if (files.length > MAX_FILES) {
        this.tooManyFiles = true
      } else {
        this.tooManyFiles = false
        this.files = files
        this.$nextTick(this.uploadFiles)
      }
    },
    clearFiles: function () {
      this.files = []
      this.urls = []
    },
    uploadFiles: async function () {
      this.$emit('uploading-started')
      const promises = this.files.map(async (file) => {
        const onProgress = (percentage) => {
          this.$refs[file.name].style.setProperty('--percentage', `${percentage}%`)
        }
        return await uploadImage(file, onProgress)
      })
      try {
        this.urls = await Promise.all(promises)
      } catch (e) {
        this.uploadError = true
        this.clearFiles()
        console.error(e)
        airbrake.notify(e)
      } finally {
        this.$emit('uploading-finished')
      }
    }
  }
}
</script>

<style scoped>
.filename {
  --percentage: 1%;
  background: rgba(0, 0, 0, 0) linear-gradient(to right, black var(--percentage), rgb(195, 194, 194) var(--percentage)) repeat scroll 0% 0%;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
}
</style>