<template>
  <div class="mb-4 flex items-center gap-x-4">
    <span>修饰按键：</span>
    <el-radio-group v-model="modifierKey">
      <el-radio-button value="alt">Alt</el-radio-button>
      <el-radio-button value="shift">Shift</el-radio-button>
      <el-radio-button value="ctrl">Ctrl</el-radio-button>
      <el-radio-button value="">None</el-radio-button>
    </el-radio-group>
    <span>行多选触发操作：</span>
    <span>
      <span v-if="modifierKey">
        按下 <kbd>{{ modifierKey }}</kbd> +
      </span>
      <span>长按鼠标左键</span>
    </span>
    <span> 状态： </span>
    <el-tag :type="active ? 'success' : 'danger'">
      {{ active ? '激活多选' : '关闭多选' }}
    </el-tag>
  </div>
  <el-table ref="tableRef" :data="tableData" style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>
<script lang="ts" setup>
import useElTableRangeSelect, {
  ModifierKey,
} from '@nano/composables/el-table-range-select'
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
const modifierKey: Ref<ModifierKey> = ref('alt')
const {
  onCurrentChange,
  onStart,
  start: startIndex,
  active,
} = useElTableRangeSelect(tableRef, { lazy: 100, modifier: modifierKey })
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
