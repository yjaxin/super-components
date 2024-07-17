<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      max-height="230"
      :data="sourceData">
      <template #operate="{$index}">
        <el-text @click="del($index)" type="danger">delete</el-text>
      </template>
    </super-table>
    <el-button @click="add">Add Item</el-button>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
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
    width: 80
  }
])

const add = () => {
  sourceData.value.push({
    name: 'Bob',
    age: 20,
    address: 'No. 189, Grove St, Los Angeles'
  })
}
const del = (index: number) => {
  sourceData.value.splice(index, 1)
}
</script>
<style scoped>
.el-button {
  width: 100%;
  margin-top: 20px
}
:deep(.el-text) {
  cursor: pointer;
}
</style>
