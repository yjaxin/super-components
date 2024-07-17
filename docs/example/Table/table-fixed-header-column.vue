<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      height="160"
      :data="sourceData">
      <template #operate>
        <el-button type="primary">save</el-button>
        <el-button type="danger">delete</el-button>
      </template>
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Tom', age: 13, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Tom', age: 14, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 20, address: 'No. 189, Grove St, Los Angeles'}
])
const tableColumn = ref([
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 130
  },
  {
    prop: 'address',
    label: '地址',
    width: 600
  },
  {
    label: '操作',
    fixed: 'right',
    slotName: 'operate',
    width: 180
  }
])
</script>
