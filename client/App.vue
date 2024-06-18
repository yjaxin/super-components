<template>
  <super-form
    ref="superFormRef"
    v-model="formData"
    :formConfigList="formConfigList"
    :rules="rules"
  ></super-form>
  <el-button @click="submit">22</el-button>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {Calendar, Search} from '@element-plus/icons-vue'
import {ItemConfig} from "@/components/SuperForm/index.d";

const rules = reactive({
  a: [
    {required: true, message: 'Please input Activity name', trigger: 'blur'},
    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
  ],
})

const formConfigList = ref<ItemConfig[]>([
  {
    prop: 'a',
    label: '22',
    componentName: 'ElInput',
    formItemAttr: {
      required: true
    },
    componentAttr: {
      style: 'width: 240px',
      placeholder: "Please input",
      prefixIcon: Search
    },
    events: {
      input: (e) => {
        console.log(e)
      }
    }
  },
])
const formData = reactive({
  a: '3331'
})

const superFormRef = ref()
const submit = async () => {
  const res = await superFormRef.value.validate()
  console.log(res)
  console.log(superFormRef.value)
}
</script>
<style scoped lang="scss">
</style>
