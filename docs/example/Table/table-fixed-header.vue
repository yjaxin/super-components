<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      height="160"
      :data="sourceData">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {name: 'Tom', age: 12, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 20, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 21, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 22, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 23, address: 'No. 189, Grove St, Los Angeles'},
  {name: 'Bob', age: 24, address: 'No. 189, Grove St, Los Angeles'}
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
