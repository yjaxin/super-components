<template>
  <div>
    <super-table
      ref="tableRef"
      highlight-current-row
      :tableColumn="tableColumn"
      :data="sourceData">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";

const tableRef = ref()
const sourceData = ref([
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
onMounted(() => {
  console.log(tableRef.value?.superTableRef.setCurrentRow)
  tableRef.value?.superTableRef.setCurrentRow(sourceData.value[0])
})
</script>
