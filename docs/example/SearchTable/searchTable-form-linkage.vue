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
import {onMounted, ref} from "vue";

const superTableRef = ref()

const sourceData = ref([
  { name: '张三', age: 13, address: '重庆市' }
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
const options = ref([])
const formItemListClone = ref(
  [
    {
      prop: 'gender1',
      label: '性别',
      componentName: "ElSelect",
      componentAttr: {
        placeholder: '请选择',
        options, // options: options
      },
      events: {
        change: (v: number) => {
          if(v === 1) {
            searchConfig.value.defaultQuery.name1 = '张三爷'
          } else {
            searchConfig.value.defaultQuery.name1 = '李四妹'
          }
        }
      }
    },
    {
      prop: 'name1',
      label: '姓名',
      componentName: "ElInput",
      componentAttr: {
        placeholder: '请输入'
      }
    },
    {
      prop: 'date1',
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
  labelWidth: 40,
  spanConfig: { col: 2},
  defaultQuery: { name1: '' }
})

onMounted(() => {
  // 模拟异步请求
  setTimeout(() => {
    options.value = [{ label: '男', value: 1}, { label: '女', value: 0 }]
  })
})
</script>
