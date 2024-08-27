<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  size: {
    type: [String, Number],
    default: '1em',
  }
});

const ComponentSvg = defineAsyncComponent({
  loader: () => import(`@/assets/svg/${props.name}.svg`).catch(() => {
    return Promise.reject(new Error(`Failed to load SVG: ${props.name}`))
  }),
  errorComponent: '',
})
</script>

<template>
  <ComponentSvg :fill="color" :width="size" :height="size" />
</template>