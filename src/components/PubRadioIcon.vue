<script setup>
import { computed } from 'vue'
import { colors } from '@/utils/public.js'

const props = defineProps({
  allList: {
    type: Array,
    default: () => [],
  },
  color: {
    type: String,
    default: 'white',
  },
  colorAction: {
    type: String,
    default: colors.primary,
  },
  size: {
    type: String,
    default: '1.5rem',
  },
  space: {
    type: String,
    default: '1.4rem',
  },
  showText: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel()
function update(item) {
  model.value = item.key
}

const isActive = computed(() => (item) => model.value === item.key)

const style = computed(() => (item) => {
  const color = isActive.value(item) ? props.colorAction : props.color
  return {
    margin: `0 ${props.space}`,
    fontSize: props.size,
    color,
  }
});
</script>


<template>
  <div class="pub-radio-icon">
    <div class="box" v-for="item in allList" :key="item.key" :style="style(item)" @click="update(item)">
      <pub-svg :name="item.name"></pub-svg>
      <p v-if="showText">{{ item.value }}</p>
    </div>
  </div>
</template>


<style scoped>
.pub-radio-icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.box p {
  margin-top: 10px;
  font-size: var(--fs-xs);
}
</style>