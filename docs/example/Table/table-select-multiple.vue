<template>
  <div>
    <super-table
      ref="mutTableRef"
      highlight-current-row
      :tableColumn="tableColumn"
      @selection-change="selectchange"
      :data="sourceData">
    </super-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(sourceData[1])">
        Toggle selection status of second rows
      </el-button>
      <el-button @click="clearSelection">Clear selection</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const mutTableRef = ref()

const clearSelection = () => {
  mutTableRef.value.superTableRef.clearSelection()
}

const selectchange = (selectRow: any) => {
  console.log(selectRow)
}
const toggleSelection = (row: any) => {
  mutTableRef.value.superTableRef.toggleRowSelection(row, undefined)
}

const sourceData = ref([
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 20, address: 'No. 189, Grove St, Los Angeles'}
])
const tableColumn = ref([
  {
    type: 'selection',
    width: 80
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120
  },
  {
    prop: 'age',
    label: '年龄',
    width: 130
  },
  {
    prop: 'address',
    label: '地址',
  }
])
</script>
