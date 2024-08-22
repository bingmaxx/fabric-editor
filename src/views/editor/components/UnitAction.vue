<script setup>
import { computed } from 'vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['remove', 'order', 'copy', 'group', 'ungroup', 'rotate', 'test'])

const actionList = [
  { event: 'remove', value: '', name: 'delete', always_active: false }, // 删除
  { event: 'order', value: 'up', name: 'up', always_active: false }, // 上移一层
  { event: 'order', value: 'down', name: 'down', always_active: false }, // 下移一层
  { event: 'copy', value: '', name: 'copy', always_active: false }, // 复制
  { event: 'group', value: '', name: 'group', always_active: false }, // 组合
  { event: 'ungroup', value: '', name: 'ungroup', always_active: false }, // 取消组合
  { event: 'rotate', value: 'left', name: 'rotate_l', always_active: false }, // 向左旋转
  { event: 'rotate', value: 'right', name: 'rotate_r', always_active: false }, // 向右旋转
  { event: 'test', value: '', name: 'test', always_active: true }, // 测试
]

const color = computed(() => (item) => (props.isActive || item.always_active) ? 'white' : 'var(--fc-2)')

function handle(item) {
  emit(item.event, item.value)
}
</script>


<template>
  <div class="unit-action">
    <div class="icon" v-for="item in actionList" :key="item.name">
      <PubSvg :name="item.name" :color="color(item)" size="1.25rem" @click="handle(item)"></PubSvg>
    </div>
  </div>
</template>


<style scoped>
.unit-action {
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  margin: 1rem 0;
  cursor: pointer;
}
</style>