<script setup>
import { reactive, onMounted, computed } from 'vue'
import { Template } from '@/logic/template.class.js'
import UnitAction from './components/UnitAction.vue'
import UnitTab from './components/UnitTab.vue'
import UnitTools from './components/UnitTools.vue'
import UnitToolImg from './components/UnitToolImg.vue'

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
  backgroundColor: 'white',
}
let template = null

let toolsObj = reactive({})
const componentTools = {
  UnitToolImg,
}
const componentTool = computed(() => componentTools[toolsObj.component])
const hasTool = computed(() => !!toolsObj.key)

onMounted(() => {
  template = new Template(tempObj)
})

function download() {
  template.download()
}

function toolsHandle(item) {
  Object.assign(toolsObj, item)
}

function toolsConfirm() {
  template.finish()
  toolsHandle({ key: '', component: '', value: '' })
}
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

    <div class="container-function">
      <UnitTab v-show="!hasTool" value-right="下载" @right="download"></UnitTab>
      <UnitTab v-show="hasTool" type="icon" value-right="check" @right="toolsConfirm"></UnitTab>

      <UnitTools v-show="!hasTool" @click="toolsHandle($event)"></UnitTools>

      <KeepAlive>
        <component :is="componentTool"></component>
      </KeepAlive>
    </div>
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

.container-function .unit-tab {
  border-bottom: 1px solid #282828;
}
</style>