<template>
  <div class="h-[400px]">
    <virtual-scroll :item-size="50" :items="items">
      <template #item="{ data }">
        <div class="w-full py-1 pr-2">
          <div
            class="flex flex-col justify-center items-center gap-y-4 bg-[#ecf5ff] text-[#409eff] w-full h-full p-4 rounded"
          >
            <span>{{ data }}</span>
            <div
              v-for="i in data.subItemCount"
              :key="`sub-${data.index}-${i}`"
              class="bg-[#fde2e2] text-[#f56c6c] w-full px-4 py-2 text-center"
            >
              <span>{{ `sub-item-${data.index}-${i}` }}</span>
            </div>
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
  return Array.from({ length: 50 }, (_, i) => {
    return {
      text: `item-${i + 1}`,
      index: i,
      subItemCount: parseInt((Math.random() * 5 + 1).toFixed(0)),
    }
  })
}
const items = ref(generateItems())
</script>
