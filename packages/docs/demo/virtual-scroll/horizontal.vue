<template>
  <div class="h-[100px]">
    <virtual-scroll :item-size="100" :items="items" direction="horizontal">
      <template #item="{ data }">
        <div class="h-full w-[100px] px-1 pb-2">
          <div
            class="bg-[#ecf5ff] w-full h-full text-[#409eff] flex justify-center items-center rounded"
          >
            <span>{{ data.text }}</span>
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
</script>
