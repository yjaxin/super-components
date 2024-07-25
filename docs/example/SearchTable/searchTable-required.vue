<template>
  <div>
    <div class="table">
      <super-table
        :data="sourceData"
        ref="superTableRef"
        :tableColumn="tableColumn"
        :searchConfig="searchConfig">
      </super-table>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref} from "vue";

const superTableRef = ref()

const sourceData = ref([
  {name: '张三', age: 13, address: '重庆市'}
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
  },
  {
    prop: 'address',
    label: '地址',
    width: 520,
  }
])
const formItemListClone = ref(
  [
    {
      prop: 'gender3',
      label: '性别',
      componentName: "ElSelect",
      formItemAttr: {
        rules: [
          {required: true, message: '请选择性别'}
        ]
      },
      componentAttr: {
        placeholder: '请选择',
        options: [
          {label: '男', value: 1},
          {label: '女', value: 0}
        ]
      }
    },
    {
      prop: 'name3',
      label: '姓名',
      componentName: "ElInput",
      componentAttr: {
        placeholder: '请输入'
      }
    },
    {
      prop: 'date3',
      label: '日期',
      componentName: "ElDatePicker",
      componentAttr: {
        placeholder: '请选择'
      }
    },
  ]
)
const searchConfig = ref({
  formConfigList: formItemListClone.value,
  spanConfig: {col: 2},
  labelWidth: 60
})

</script>
