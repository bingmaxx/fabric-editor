<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['confirm'])

const ratio = ref('9_16');
const ratioList = [
  { key: '9_16', name: 'ratio_9_16', value: '9:16' },
  { key: '1_1', name: 'ratio_1_1', value: '1:1' },
  { key: 'free', name: 'ratio_free', value: '自由' },
]
const ratioMap = {
  '9_16': { width: 1242, height: 2208 },
  '1_1': { width: 1242, height: 1242 },
  'free': { width: null, height: null },
}
const width = ref(null);
const height = ref(null);

function ratioChange() {
  const { width: w, height: h } = ratioMap[ratio.value] || {};
  width.value = w;
  height.value = h;
}

function widthChange(width) {
  if (ratio.value === '9_16') {
    height.value = Math.ceil((width * 16) / 9);
  } else if (ratio.value === '1_1') {
    height.value = width;
  }
}

function heightChange(height) {
  if (ratio.value === '9_16') {
    width.value = Math.ceil((height * 9) / 16);
  } else if (ratio.value === '1_1') {
    width.value = height;
  }
}

function confirm() {
  const w = parseInt(width.value) || 0;
  const h = parseInt(height.value) || 0;
  if (w < 100 || w > 3000 || h < 100 || h > 3000) {
    return;
  }
  emit('confirm', w, h);
}

watch(ratio, () => ratioChange(), { immediate: true })
watch(width, (v) => widthChange(v))
watch(height, (v) => heightChange(v))
</script>


<template>
  <div class="editor-size">
    <p class="title">选择画布尺寸</p>

    <div class="box-1">
      <PubRadioIcon :all-list="ratioList" size="1.5rem" space="0" show-text v-model="ratio">
      </PubRadioIcon>
    </div>

    <div class="box-2">
      <div class="row">
        <p>宽</p>
        <input type="text" v-model="width" placeholder="请输入" />
        <p>px</p>
      </div>
      <div class="row">
        <p>高</p>
        <input type="text" v-model="height" placeholder="请输入" />
        <p>px</p>
      </div>
      <p class="desc">注：数值范围 100 - 3000</p>
      <button @click="confirm">创建画布</button>
    </div>
  </div>
</template>


<style scoped>
.editor-size {
  height: 100vh;
  padding: 20px 30%;
  background-color: #0f0e1b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
  font-size: var(--fs-base);
}

.box-1,
.box-2 {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  background-color: #232435;
}

.box-1 {
  margin: 20px 0;
}

.box-1 ::v-deep .pub-radio-icon {
  justify-content: space-around;
}

.box-2 .row {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 20px;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #0f0e1b;
}

.box-2 .row input {
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 20px;
}

.box-2 .row input,
.box-2 .row input:active {
  color: #606266;
  background-color: transparent;
  border: none;
  outline: none;
}

.box-2 p {
  font-size: var(--fs-sm);
  color: #909399;
}

button {
  width: 100%;
  height: 40px;
  margin-top: 24px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(to right, rgb(152, 243, 199), var(--c-primary));
  color: white;
  cursor: pointer;
}
</style>