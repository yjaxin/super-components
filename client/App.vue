<template>
  <div>
    <div class="table">
      <super-table
        ref="superTableRef"
        :searchConfig="searchConfig"></super-table>
    </div>
    <div class="form">
      <!--      <super-form-->
      <!--        :spanConfig="{col: 2}"-->
      <!--        :formConfigList="formItemListClone"-->
      <!--      ></super-form>-->
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref} from "vue";
import {SuperFormItemType} from "@/components/SuperForm/index.d";

const superTableRef = ref()
const formItemListClone = ref<Array<SuperFormItemType>>(
  [
    {
      prop: 'a4',
      label: '1qeq232',
      componentName: "ElSelect",
      formItemAttr: {
        required: true,
      },
      componentAttr: {
        options: [{label: '222', value: 333}]
      }
    },
    {
      prop: 'a3',
      label: '1qeq232',
      componentName: "ElInput",
      formItemAttr: {}
    },
    {
      prop: 'a2',
      label: '1qeq232',
      componentName: "ElInput",
      formItemAttr: {}
    },
    {
      prop: 'a',
      label: '1qeq232',
      componentName: "ElSelect",
      formItemAttr: {},
      componentAttr: {
        options: [
          {
            label: 'a',
            value: 1
          }
        ]
      },
      events: {
        change: (e) => {
          const res = superTableRef.value.getFormData()
        }
      }
    }
  ]
)
const searchConfig = ref({
  formConfigList: formItemListClone.value,
})
</script>
<style scoped lang="scss">
.form {
  margin-top: 50px;
}
</style>
