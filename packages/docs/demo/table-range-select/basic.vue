<template>
  <el-table
    ref="tableRef"
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    @selection-change="onSelectionChange"
  >
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
const {
  onCurrentChange,
  onStart,
  start: startIndex,
} = useElTableRangeSelect(tableRef)
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

const selections: Ref<User[]> = ref([])
const onSelectionChange = (rows: User[]) => {
  selections.value = rows
}
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (selections.value.includes(row)) return 'success-row'
  return ''
}
</script>

<style>
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
