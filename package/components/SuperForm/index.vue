<template>
  <div class="super-form-container">
    <el-form
      ref="superFormRef"
      class="super-form0"
      :model="formModel"
      :rules="props.rules"
      v-bind="attrs">
      <el-form-item
        v-for="(formItem, index) in props.formConfigList"
        :label="formItem.label"
        :prop="formItem.prop"
        v-bind="formItem.formItemAttr"
        :key="index"
      >
        <slot v-if="formItem.slotName" :name="formItem.slotName"></slot>
        <component v-else
                   v-model="formModel[formItem.prop]"
                   :is="formItem.componentName"
                   v-bind="formItem.componentAttr"
                   v-on="formItem.events"></component>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button @click="handleSave" type="primary">保存</el-button>
      <el-button>关闭</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, ref, useAttrs, watch} from "vue";
import {ItemConfig} from "./index";

const props = defineProps<{
  formConfigList: ItemConfig[],
  rules: any,
  modelValue: any
}>()
const emits = defineEmits<{
  (e: 'update:modelValue'): any
}>()

const attrs = useAttrs()
const formModel = ref({})

watch(() => props.modelValue, (newV) => {
  if (newV) {
    formModel.value = {...newV}
  }
}, {
  deep: true,
  immediate: true
})

watch(() => formModel, (newV) => {
  emits('update:modelValue', newV)
}, {
  deep: true,
  immediate: true
})

// 表单实例
const superFormRef = ref()

/**
 * 保存
 */
const handleSave = () => {
  console.log(superFormRef.value)
}
const validate = () => {
  return superFormRef.value.validate()
}
defineExpose ({
  validate,
  a: 1
})
</script>
<style scoped lang="scss">

</style>
