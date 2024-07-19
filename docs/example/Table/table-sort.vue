<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      :default-sort="{ prop: 'date', order: 'descending' }"
      :data="sourceData">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
const tableColumn = ref([
  {
    prop: 'date',
    label: '日期',
    width: 120,
    sortable: true
  },
  {
    prop: 'name',
    label: '姓名',
    width: 130,
    formatter: (row, column) => {
      return row.name + '_姓名'
    }
  },
  {
    prop: 'address',
    label: '地址',
  }
])
</script>
