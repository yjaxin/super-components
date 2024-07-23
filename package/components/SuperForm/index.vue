<template>
  <div class="super-form-container">
    <el-form
      ref="superFormRef"
      class="super-form"
      :model="modelValue"
      :rules="props.rules"
      :disabled="props.disabled"
      label-width="80px"
      :style="{
        'display': 'grid',
        'grid-template-columns': `repeat(${props.spanConfig.col}, 1fr)`,
        'column-gap': `20px`
      }"
      v-bind="attrs">
      <el-form-item
        v-for="(formItem, index) in formItemListClone"
        :ref="($events) => setRef($events, formItem.prop)"
        :label="formItem.label"
        :prop="formItem.prop"
        v-bind="formItem.formItemAttr"
        :key="formItem.prop"
      >
        <slot
          v-if="formItem.slotName"
          :name="formItem.slotName"
          :formModel="modelValue"
          :field="formItem.prop"
        ></slot>

        <component v-else
                   v-model="modelValue[formItem.prop]"
                   :is="formItem.componentName"
                   v-bind="formItem.componentAttr"
                   v-on="formItem.events || {}">
          <template v-if="formItem.componentName === 'ElSelect'">
            <el-option
              v-for="(item, index) in formItem.componentAttr.options"
              :key="index"
              :label="item.label"
              :value="item.value"></el-option>
          </template>
        </component>
      </el-form-item>
      <!--  表格搜索重置-行内  -->
      <div v-if="props.showWidthTable" class="operate-btns" :style="tableSearchBtnStyles">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <div class="collapse-toggle" @click="toggle">
          <span>{{ toggleExpand ? '收起' : '展开' }}</span>
          <el-icon v-if="toggleExpand">
            <ArrowUp />
          </el-icon>
          <el-icon v-else>
            <ArrowDown />
          </el-icon>
        </div>
      </div>
    </el-form>
    <!--  表单底部保存/取消按钮  -->
    <div v-if="props.showFooter && !props.disabled" class="footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, nextTick, onMounted, ref, useAttrs, watch} from "vue";
import type {SpanConfigType, SuperFormItemType} from "./index";
import {getTransformData} from "./hooks";
import _ from "lodash";

const props = withDefaults(defineProps<{
  // 表单项配置列表
  formConfigList: SuperFormItemType[],
  // 表单规则
  rules?: any,
  // 双向绑定
  modelValue: any
  // 确认文本
  confirmText?: string,
  // 取消文本
  cancelText?: string,
  // 按钮加载动画
  loading?: boolean,
  // 是否显示底部操作按钮
  showFooter?: boolean,
  // 是否与表格一起显示
  showWidthTable?: boolean,
  // 表单布局配置
  spanConfig?: SpanConfigType
  disabled?: boolean
}>(), {
  confirmText: '保存',
  cancelText: '取消',
  loading: false,
  showFooter: true,
  showWidthTable: false,
  disabled: false,
  modelValue: {},
  spanConfig: {
    col: 4,
  }
})
const emits = defineEmits<{
  // 双向绑定
  (e: 'update:modelValue', data: any): void
  // 表单确认
  (e: 'confirm', data: any): void
  // 表单取消
  (e: 'cancel'): void
  // 表格搜索-查询
  (e: 'search', data: any): void
  // 表格搜索-重置
  (e: 'reset'): void
}>()

const attrs = useAttrs()
const formModel = ref({})

watch(() => props.modelValue, (newV) => {
  emits('update:modelValue', newV)
}, {
  deep: true,
  immediate: true
})

// 表单实例
const superFormRef = ref()
// formItemRef
const formItemRef = ref({})
/**
 * ref设置
 * @param field
 */
const setRef = (event: any, field: string) => {
  formItemRef.value[`${field}_ref`] = event
  return `${field}_ref`
}
/**
 * 保存
 */
const handleSave = () => {
  superFormRef.value.validate().then((valid: boolean) => {
    if (valid) {
      const data = getTransformData(props.formConfigList, props.modelValue)
      emits('confirm', data)
    }
  })
}

/**
 * 取消
 */
const handleCancel = () => {
  emits('cancel')
}
/**
 *  对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
 */
const validate = () => {
  return superFormRef.value.validate()
}
/**
 * 验证具体的某个字段。
 * @param fields
 * @param cb
 */
const validateField = (fields: string, cb: any) => {
  superFormRef.value.validateField(fields, (res: any) => {
    if (cb && typeof cb === 'function') cb(res)
  })
}
/**
 * 重置该表单项，将其值重置为初始值，并移除校验结果
 */
const resetFields = () => {
  superFormRef.value.resetFields()
}
/**
 * 滚动到指定的字段
 */
const scrollToField = () => {
  superFormRef.value.scrollToField()
}
/**
 * 清理某个字段的表单验证信息。
 */
const clearValidate = (field: string) => {
  superFormRef.value.clearValidate(field)
}


/**
 * 表格搜索表单按钮样式
 */
const tableSearchBtnStyles = computed(() => {
  const gr = Math.floor(props.formConfigList.length / props.spanConfig.col) + 1
  return {
    'grid-column': `${props.spanConfig.col} / ${props.spanConfig.col + 1}`,
    'grid-row': `${gr} / ${gr}`
  }
})
/**
 * 查询
 */
const search = () => {
  validate().then(res => {
    emits('search', props.modelValue)
  })
}
/**
 * 重置
 */
const handleReset = () => {
  validate().then(res => {
    console.log(res)
    emits('reset')
  })
}


const formItemListClone = ref([])
watch(() => props.formConfigList, (newV) => {
  formItemListClone.value = _.cloneDeep(newV)
}, {
  deep: true,
  immediate: true
})


/**
 * 展开/收起切换
 */
const toggleExpand = ref(true)
const toggle = () => {
  toggleExpand.value = !toggleExpand.value
  formItemListClone.value = toggleExpand.value ? props.formConfigList.slice(0) : props.formConfigList.slice(0,
    props.spanConfig.col)
}

/**
 * 获取表单数据值
 */
const getFormData = () => {
  return getTransformData(props.formConfigList, formModel)
}
defineExpose({
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate,
  formItemRef,
  getFormData
})
</script>
<style scoped lang="scss">
.super-form-container {
  overflow: hidden;
  :deep(.el-date-editor.el-date-editor--date) {
    flex: 1;
  }

  .operate-btns {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    .collapse-toggle {
      margin-top: 6px;
      padding-left: 10px;
      font-size: 13px;
      color: var(--el-color-primary);
      cursor: pointer;

      .el-icon {
        padding-left: 4px;
      }
    }
  }

  .footer {
    text-align: right;
  }
}
</style>
