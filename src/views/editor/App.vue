<script setup>
import { ref } from 'vue'
import EditorCanvas from './EditorCanvas.vue'
import EditorSize from './EditorSize.vue'

const isOK = ref(false);
const width = ref(720);
const height = ref(1280);

function confirm(w, h) {
  isOK.value = true;
  width.value = Number(w);
  height.value = Number(h);
}
</script>

<template>
  <div>
    <EditorCanvas v-if="isOK" :width="width" :height="height"></EditorCanvas>
    <EditorSize v-else @confirm="confirm"></EditorSize>
  </div>
</template>

<style scoped></style>