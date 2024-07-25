<template>
  <div>
    <div class="table">
      <super-table
        ref="superTableRef"
        :tableColumn="tableColumn"
        :searchConfig="searchConfig"
        :remoteMethod="getTableDataApi"
      >
      </super-table>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref} from "vue";

const superTableRef = ref()

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
      prop: 'gender',
      label: '性别',
      componentName: "ElSelect",
      componentAttr: {
        placeholder: '请选择',
        options: [
          {label: '男', value: 1},
          {label: '女', value: 0}
        ]
      }
    },
    {
      prop: 'name',
      label: '姓名',
      componentName: "ElInput",
      componentAttr: {
        placeholder: '请输入'
      }
    },
    {
      prop: 'date',
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
})

/**
 * 封装的请求
 * @formModel formModel 搜索表单
 */
const getTableDataApi = (formModel: any) => {
  return request({url: 'xxx', method: 'get', data: formModel})
}

const request = (params: any) => {
  return new Promise(resolve => {
    // 表格数据响应字段可在全局注册组件时统一配置，见 快速开始 章节
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {name: '张三', age: 13, address: '重庆市'},
            {name: '李四', age: 22, address: '重庆市'},
          ],
          total: 2
        }
      })
    }, 500)
  })

}
</script>
