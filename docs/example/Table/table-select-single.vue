<template>
  <div>
    <super-table
      ref="singleTableRef"
      highlight-current-row
      :tableColumn="tableColumn"
      @current-change="handleCurrentChange"
      :data="sourceData">
    </super-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(sourceData[1])">Select second row</el-button>
      <el-button @click="setCurrent()">Clear selection</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const currentRow = ref()
const singleTableRef = ref()

const setCurrent = (row?: any) => {
  singleTableRef.value!.superTableRef.setCurrentRow(row)
}
const handleCurrentChange = (val: any) => {
  currentRow.value = val
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
