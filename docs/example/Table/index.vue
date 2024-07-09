<template>
  <div>
    <div class="table">
      <super-table
        @search="search"
        ref="superTableRef"
        :searchConfig="searchConfig">
      </super-table>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref} from "vue";
import {SuperFormItemType} from "@/components/SuperForm/index.d.ts";

const superTableRef = ref()
const formData = ref({
  ElSelect:333,
  ElInput:222,
  customInput:111,
})

const search = (data) => {
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
      transform:(v) => {
        return {
          'c': v
        }
      }
    },
    {
      prop: 'ElDatePicker',
      label: 'ElDatePicker',
      componentName: "ElDatePicker",
      formItemAttr: {}
    },
    {
      prop: 'customInput',
      label: 'Slot',
      slotName: 'customInput',
      formItemAttr: { required: true },
      events: {
        input: (e) => {
          console.log(e)
        }
      }
    },
    {
      prop: 'ElSwitch1',
      label: 'ElSwitch',
      componentName: "ElSwitch",
      formItemAttr: {},
      componentAttr: {},
      events: {
        change: (e) => {
          console.log(formData.value)
        }
      }
    }
  ]
)
const searchConfig = ref({
  formConfigList: formItemListClone.value,
  spanConfig: { col: 2 },
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
