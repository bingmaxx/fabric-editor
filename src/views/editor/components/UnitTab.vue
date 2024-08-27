<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  valueLeft: {
    type: String,
    default: '',
  },
  valueRight: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['left', 'right'])

const isIcon = computed(() => props.type === 'icon')

function handle(type) {
  emit(type)
}
</script>


<template>
  <div class="unit-tab">
    <template v-if="isIcon">
      <PubSvg :name="valueLeft" color="white" size="1.25rem" @click="handle('left')"></PubSvg>
      <p class="title">{{ title }}</p>
      <PubSvg :name="valueRight" color="white" size="1.25rem" @click="handle('right')"></PubSvg>
    </template>

    <template v-else>
      <p class="text" @click="handle('left')">{{ valueLeft }}</p>
      <p class="title">{{ title }}</p>
      <p class="text" @click="handle('right')">{{ valueRight }}</p>
    </template>
  </div>
</template>


<style scoped>
.unit-tab {
  width: 100%;
  height: 40px;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

p.title {
  flex: 1;
  color: var(--fc-3);
  font-size: var(--fs-sm);
  text-align: center;
}

p.text {
  color: white;
  font-size: var(--fs-sm);
}

p.text,
p.title {
  cursor: pointer;
}
</style>