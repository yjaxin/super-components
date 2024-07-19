<template>
  <div>
    <el-radio-group v-model="tableLayout" style="margin-bottom: 10px">
      <el-radio-button value="fixed">fixed</el-radio-button>
      <el-radio-button value="auto">auto</el-radio-button>
    </el-radio-group>
    <super-table
      :table-layout="tableLayout"
      :tableColumn="tableColumn"
      :data="sourceData">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";


const tableLayout = ref('fixed')
const sourceData = ref([
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 20, address: 'No. 189, Grove St, Los Angeles'}
])
const tableColumn = ref([
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'address',
    label: '地址',
  }
])
</script>
