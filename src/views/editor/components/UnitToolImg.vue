<script setup>

const paramList = [
  { key: 'tailor', name: 'tool_img_tailor', value: '裁剪' },
  { key: 'replace', name: 'tool_img_replace', value: '替换' },
]

const emit = defineEmits(['change'])

function handle(key) {
  emit('change', 'tool_img', key)
}
</script>


<template>
  <div class="unit-tool-img">
    <PubRadioIcon :all-list="paramList" size="1.2rem" color-action="white" show-text
      @update:modelValue="handle($event)"></PubRadioIcon>
  </div>
</template>


<style scoped>
.unit-tool-img {
  width: 100%;
  display: flex;
  margin-top: 1.25rem;
}
</style>