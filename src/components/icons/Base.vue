<template>
  <svg id="_x31_-outline-expand" :viewBox="`0 0 ${vbwidth} ${vbwidth}`" x="0px" xml:space="preserve"
       xmlns="http://www.w3.org/2000/svg" y="0px">
    <defs>
      <linearGradient :id="gradId" gradientUnits="userSpaceOnUse" x1="0%" x2="100%" y1="0%" y2="0%">
		    <stop offset="0%" style="stop-color:#266b0c"/>
        <stop offset="50%" style="stop-color:#103799"/>
        <stop offset="100%" style="stop-color:#ae11ab"/>
	    </linearGradient>
    </defs>
    <g :style="`fill:url(#${gradId})`">
      <slot/>
    </g>
    text
  </svg>
</template>

<script>
let currentId = 0

import {ref} from 'vue'

export default {
  name: 'Base',
  props: {
    vbwidth: {
      type: Number,
      default: 64
    },
    iconName: {
      type: String
    }
  },
  setup(props) {
    const gradId = ref(`gradient-${props.iconName}`)
    return {gradId}
  }
}
</script>