<template>
  <div>
    <div class="table">
      <super-table
        :data="sourceData"
        ref="superTableRef"
        :tableColumn="tableColumn"
        :searchConfig="searchConfig"
        @search="search">
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
      prop: 'date',
      label: '日期',
      componentName: "ElDatePicker",
      componentAttr: {
        type: "daterange",
        placeholder: '请选择',
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD'
      },
      transform:(date: any) => {
        if(date) {
          return {
            startTime: date[0],
            endTime: date[1],
          }
        }
      }
    },
  ]
)
const searchConfig = ref({
  formConfigList: formItemListClone.value,
  spanConfig: {col: 2},
})

const search = (formData: any) => {
  console.log(formData)
}
</script>
