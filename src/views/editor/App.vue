<script setup>
import { ref } from 'vue'
import EditorSize from './EditorSize.vue'

const isOK = ref(false);

function confirm() {
  isOK.value = true;
}
</script>

<template>
  <div>
    <EditorSize v-if="!isOK" @confirm="confirm"></EditorSize>
  </div>
</template>

<style scoped></style>