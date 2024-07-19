<template>
  <div>
    <el-row>
      <el-button @click="resetDateFilter">reset date filter</el-button>
      <el-button @click="clearFilter">reset all filters</el-button>
    </el-row>
    <super-table
      ref="filterTableRef"
      :tableColumn="tableColumn"
      :data="sourceData">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const filterTableRef = ref()
const resetDateFilter = () => {
  filterTableRef.value!.superTableRef.clearFilter(['date'])
}

const clearFilter = () => {
  filterTableRef.value!.superTableRef.clearFilter()
}

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
    sortable: true,
    'column-key': "date",
    filters: [
      {text: '2016-05-01', value: '2016-05-01'},
      {text: '2016-05-02', value: '2016-05-02'},
      {text: '2016-05-03', value: '2016-05-03'},
      {text: '2016-05-04', value: '2016-05-04'},
    ],
    'filter-method': (value: string, row: any, column: any) => {
      const property = column['property']
      return row[property] === value
    }
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
<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
