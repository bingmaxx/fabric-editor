<script setup>
import { fabricPub } from '@/utils/public.js'

const LIST = fabricPub.toolList

const emit = defineEmits(['click'])

function handle(key) {
  emit('click', key)
}
</script>


<template>
  <div class="unit-tools">
    <div class="box" v-for="item in LIST" :key="item.key" @click="handle(item.key)">
      <PubSvg :name="item.key" color="white" size="1.25rem"></PubSvg>
      <p>{{ item.value }}</p>
    </div>
  </div>
</template>


<style scoped>
.unit-tools {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.box {
  margin: 1.25rem 0.5rem 0 0.5rem;
  min-width: calc(var(--fs-xs) * 4 + 0.125rem);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.box p {
  margin-top: 0.625rem;
  color: var(--fc-3);
  font-size: var(--fs-xs);
}
</style>