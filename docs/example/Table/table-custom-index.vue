<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      :data="sourceData">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 20, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 20, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 20, address: 'No. 189, Grove St, Los Angeles'}
])
const tableColumn = ref([
  {
    type: 'index',
    index: (index: number) => {
      return index * 2
    }
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
