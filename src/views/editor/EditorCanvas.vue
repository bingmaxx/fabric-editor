<script setup>
import { reactive, onMounted, computed } from 'vue'
import { Template } from '@/logic/template.class.js'
import { inputImageToDataURL } from '@/utils/index.js'
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

const toolsFuncObj = {
  tool_img: {
    add: addImage,
  },
}

const toolFuncObj = {
  tool_img: {
    tailor: tailorImage,
    replace: replaceImage,
  }
}

onMounted(() => {
  template = new Template(tempObj)
})

function download() {
  template.download()
}

function toolsHandle(item) {
  Object.assign(toolsObj, item)
  const { key, immediate } = toolsObj
  if (!immediate) return
  if (!toolsFuncObj[key] || typeof toolsFuncObj[key].add !== 'function') return
  toolsFuncObj[key].add()
}

function toolsConfirm() {
  template.finish()
  toolsHandle({ key: '', component: '', value: '' })
}

async function addImage() {
  const url = await inputImageToDataURL();
  const data = { tool: 'tool_img' };
  await template.addImage({ url, data });
}

function toolHandle(tool, key) {
  if (!toolFuncObj[tool] || typeof toolFuncObj[tool][key] !== 'function') return
  toolFuncObj[tool][key]();
}

async function replaceImage() {
  const url = await inputImageToDataURL();
  await template.replaceImage({ url });
}

function tailorImage() {
  template.tailorImage();
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

      <UnitTools v-show="!hasTool" @click="toolsHandle"></UnitTools>

      <KeepAlive>
        <component :is="componentTool" @change="toolHandle"></component>
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