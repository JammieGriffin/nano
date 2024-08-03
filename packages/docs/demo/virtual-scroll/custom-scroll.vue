<template>
  <div class="mb-4">
    <el-button @click="scrollRef.scrollTo(1000)"
    >scroll to 1000 px from the top
    </el-button>
    <el-button @click="scrollRef.scrollToIndex(100)"
    >scroll to 100th item
    </el-button>
    <el-button @click="scrollRef.scrollToIndex(-1)"
    >scroll to the last item
    </el-button>
  </div>
  <div class="h-[400px]">
    <virtual-scroll ref="scrollRef" :item-size="50" :items="items">
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

const scrollRef = ref()

</script>
