<template>
  <div>
    <div class="table">
      <super-table
        @search="search"
        :data="sourceData"
        ref="superTableRef"
        :tableColumn="tableColumn"
        @selection-change="selectchange"
        :searchConfig="searchConfig">
        <template #nameSlot>
          <span>姓名插槽-李四</span>
        </template>
        <template #nameHeaderSlot1>
          <span>姓名表头插槽1</span>
        </template>
        <template #nameHeaderSlot2>
          <span>姓名表头插槽2</span>
        </template>
        <template #nameHeaderSlot3>
          <span>姓名表头插槽2</span>
        </template>
        <template #addressSlot>
          <span>地址插槽</span>
        </template>
      </super-table>
    </div>
  </div>

</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {SuperFormItemType} from "@/components/SuperForm/index.d";

const superTableRef = ref()
onMounted(() => {
})
const selectchange = (e: any) => {
  console.log(e)
}
const formData = ref({
  ElSelect: 333,
  ElInput: 222,
  customInput: 111,
})
const sourceData = ref([
  {name: '张三', age: 13, address: '重庆市'}
])
const tableColumn = ref([
  {
    type: 'selection',
    width: 320
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
    headerSlot: 'nameHeaderSlot1',
    children: [
      {
        label: 2,
        headerSlot: 'nameHeaderSlot2',
        children: [
          {
            label: 3,
            prop: 'name',
            slotName: 'nameSlot',
            headerSlot: 'nameHeaderSlot3',
          }
        ]
      }
    ]
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'address',
    label: '地址',
    width: 520,
    slotName: 'addressSlot'
  }
])
const search = (data: any) => {
  console.log(data)
}

const formItemListClone = ref<Array<SuperFormItemType>>(
  [
    {
      prop: 'ElSelect',
      label: 'ElSelect',
      componentName: "ElSelect",
      formItemAttr: {
        required: true,
      },
      componentAttr: {
        options: [{label: '222', value: 333}]
      }
    },
    {
      prop: 'ElInput',
      label: 'ElInput',
      componentName: "ElInput",
      formItemAttr: {},
      transform: (v) => {
        return {
          'c': v
        }
      }
    },
    {
      prop: 'ElDatePicker',
      label: 'ElDatePicker',
      componentName: "ElDatePicker",
      formItemAttr: {},
      componentAttr: {
        placeholder: '请选1择'
      }
    },
    {
      prop: 'ElSwitch',
      label: 'ElSwitch',
      componentName: "ElSwitch",
      formItemAttr: {required: false},
      componentAttr: {},
      events: {
        change: (e: any) => {
          console.log(formData.value)
        }
      }
    }
  ]
)
const searchConfig = ref({
  formConfigList: formItemListClone.value,
  spanConfig: {col: 3},
  // defaultQuery: {ElInput: 22}
})
const confirm = (data) => {
  console.log(data)
}
</script>
<style scoped lang="scss">
.form {
  margin-top: 50px;
}
</style>
