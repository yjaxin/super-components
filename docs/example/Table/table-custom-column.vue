<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      :data="sourceData">
      <template #name="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.date }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #date="scope">
        <div style="display: flex; align-items: center">
<!--          <el-icon><timer /></el-icon>-->
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
      <template #operations="scope">
        <el-button size="small">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
        >
          Delete
        </el-button>
      </template>
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
  },
])
const tableColumn = ref([
  {
    prop: 'name',
    label: '姓名',
    slotName: 'name',
    width: 90
  },
  {
    prop: 'date',
    label: '日期',
    slotName: 'date'
  },
  {
    prop: 'operations',
    label: '操作',
    slotName: 'operations'
  }
])
</script>
