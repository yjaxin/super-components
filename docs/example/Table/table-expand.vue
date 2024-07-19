<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      :data="sourceData">
      <template #name="scope">
        <div style="padding-left: 20px">
          姓名：{{scope.row.name}}；年龄：{{scope.row.age}}
        </div>
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
    type: 'expand',
    slotName: 'name'
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
