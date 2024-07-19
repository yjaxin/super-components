<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      row-key="id"
      default-expand-all
      :data="sourceData">
    </super-table>

    <super-table
      style="margin-top: 30px"
      :tableColumn="tableColumn1"
      row-key="id"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :data="sourceData1">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {
    id: 1,
    date: '2024-05-02',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2024-05-04',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2024-05-01',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2024-05-01',
        name: 'Jax',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2024-05-01',
        name: 'Jax',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  },
  {
    id: 4,
    date: '2024-05-03',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
const tableColumn = ref([
  {
    prop: 'name',
    label: '姓名',
    width: 120
  },
  {
    prop: 'date',
    label: '日期',
    width: 130
  },
  {
    prop: 'address',
    label: '地址',
  }
])

const sourceData1 = ref([
  {
    id: 1,
    date: '2024-05-02',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2024-05-04',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2024-05-01',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
    hasChildren: true,
  },
  {
    id: 4,
    date: '2024-05-03',
    name: 'Jax',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
const tableColumn1 = ref([
  {
    prop: 'name',
    label: '姓名',
    width: 120
  },
  {
    prop: 'date',
    label: '日期',
    width: 130
  },
  {
    prop: 'address',
    label: '地址',
  }
])

const load = (row, treeNode, resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2024-05-01',
        name: 'Jax',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2024-05-01',
        name: 'Jax',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])
  }, 1000)
}
</script>
