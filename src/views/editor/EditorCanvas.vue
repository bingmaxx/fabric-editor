<script setup>
import { onMounted } from 'vue'
import { Template } from '@/logic/template.class';
import UnitAction from './components/UnitAction.vue'

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
})

const canvasID = 'canvas'
const tempObj = {
  id: canvasID,
  width: props.width,
  height: props.height,
}

onMounted(() => {
  const template = new Template(tempObj)
})
</script>


<template>
  <div class="editor-canvas">
    <div class="container-action">
      <UnitAction></UnitAction>
    </div>

    <div class="container-layer">
    </div>

    <div class="container-canvas">
      <canvas :id="canvasID"></canvas>
    </div>

    <div class="container-function"></div>
  </div>
</template>


<style scoped>
.editor-canvas {
  width: 100%;
  height: 100vh;
  background-color: #35363A;
  display: flex;
}

.container-action {
  width: 60px;
  min-width: 60px;
  border-right: 1px solid #282828;
}

.container-layer {
  width: 200px;
}

.container-canvas {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-function {
  width: 320px;
  border-left: 1px solid #282828;
}
</style>