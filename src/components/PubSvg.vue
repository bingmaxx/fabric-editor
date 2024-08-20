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
    default: '24',
  }
});

const ComponentSvg = defineAsyncComponent(() => import(`@/assets/svg/${props.name}.svg`))
</script>

<template>
  <ComponentSvg :fill="color" :width="size" :height="size" />
</template>