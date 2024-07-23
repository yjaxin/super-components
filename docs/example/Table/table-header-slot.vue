<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      :data="sourceData">
      <template #headerSlotName="a">
        <span>这是自定义表头插槽</span>
      </template>
      <template #ageSlot>
        <span>这是默认插槽</span>
      </template>
    </super-table>
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
    width: 160,
    headerSlot: 'headerSlotName'
  },
  {
    prop: 'age',
    label: '年龄',
    width: 130,
    slotName: 'ageSlot'
  },
  {
    prop: 'address',
    label: '地址',
  }
])
</script>
