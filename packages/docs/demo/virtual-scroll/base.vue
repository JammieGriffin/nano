<template>
  <div class="mb-4">
    <el-button @click="onAddItems">Add 100 items</el-button>
  </div>
  <div class="h-[400px]">

    <virtual-scroll :item-size="50" :items="items">
      <template #item="{ data }">
        <div class="h-[50px] w-full py-1 pr-2">
          <div
            class="bg-[#ecf5ff] w-full h-full text-[#409eff] flex justify-center items-center rounded"
          >
            <span>{{ data }}</span>
          </div>
        </div>
      </template>
    </virtual-scroll>
  </div>
</template>
<script setup lang="ts">
import VirtualScroll from '@nano/components/virtual-scroll'
import { ref } from 'vue'

const generateItems = () => {
  return Array.from({ length: 10000 }, (_, i) => {
    return {
      text: `item-${i + 1}`,
      index: i,
    }
  })
}
const items = ref(generateItems())
const onAddItems = () => {
  const startIndex = items.value.length
  items.value = items.value.concat(
    Array.from({ length: 100 }, (_, i) => {
      return {
        text: `item-${i + 1 + startIndex}`,
        index: i + startIndex,
      }
    })
  )
}
</script>
