<template>
  <div class="mb-4">
    <el-radio-group v-model="cursorStyle">
      <el-radio-button class="cursor-default" value="default">
        default
      </el-radio-button>
      <el-radio-button class="cursor-cell" value="cell">
        cell
      </el-radio-button>
      <el-radio-button class="cursor-move" value="move">move</el-radio-button>
      <el-radio-button class="cursor-pointer" value="pointer">
        pointer
      </el-radio-button>
      <el-radio-button class="cursor-ns-resize" value="ns-resize">
        ns-resize
      </el-radio-button>
      <el-radio-button class="cursor-crosshair" value="crosshair">
        crosshair
      </el-radio-button>
    </el-radio-group>
  </div>
  <el-table ref="tableRef" :data="tableData" style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>
<script lang="ts" setup>
import useElTableRangeSelect from '@nano/composables/el-table-range-select'
import { ref, Ref } from 'vue'

interface User {
  date: string
  name: string
  address: string
}

const tableData: Ref<User[]> = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

const tableRef = ref()
const cursorStyle = ref('cell')
const {
  onCurrentChange,
  onStart,
  start: startIndex,
} = useElTableRangeSelect(tableRef, {
  lazy: 100,
  activeCursorStyle: cursorStyle,
})
onStart((startIndex: number) => {
  tableRef.value.toggleRowSelection(tableData.value[startIndex])
})
onCurrentChange(
  (currentIndex: number, prevIndex: number, isInverse: boolean) => {
    if (isInverse) {
      tableRef.value.toggleRowSelection(tableData.value[prevIndex])
      return
    }
    if (currentIndex !== startIndex.value)
      tableRef.value.toggleRowSelection(tableData.value[currentIndex])
  }
)
</script>
<style scoped>
:deep(.el-radio-button__inner) {
  cursor: inherit;
}
</style>
