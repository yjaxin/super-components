<template>
  <div class="super-table-container">
    <header v-if="props.searchConfig?.formConfigList">
      <super-form
        ref="superFormRef"
        v-model="formData"
        :spanConfig="{
          col: 3,
        }"
        v-bind="props.searchConfig"
        :show-footer="false"
        showWidthTable
        @search="search"
        @reset="reset"
      >
      </super-form>
    </header>
    <main>
      <el-table
        ref="superTableRef"
        :header-cell-style="{ background: '#f1f1f1' }"
        v-loading
        border
        v-bind="attrs"
      >
        <template
          v-for="(column, colIndex) in props.tableColumn"
          :key="colIndex">
          <!--    表头header插槽      -->
          <table-column v-bind="column">
            <template v-for="(_, key, index) in slots" :key="index" #[key]>
              <slot :name="key"></slot>
            </template>
<!--            <template v-if="column.slotName" #default="scope">-->
<!--              <slot :name="column.slotName" v-bind="scope"></slot>-->
<!--            </template>-->
          </table-column>
<!--          <el-table-column v-if="['header'].includes(column.slotName)">-->
<!--            <template #[column.slotName]="scope">-->
<!--              <slot :name="column.slotName" :row="scope.row" :$index="scope.$index"></slot>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          &lt;!&ndash;    常规column和插槽      &ndash;&gt;-->
<!--          <el-table-column v-else v-bind="column">-->
<!--            <template v-if="column.slotName" #default="scope">-->
<!--              <slot :name="column.slotName" :row="scope.row" :$index="scope.$index"></slot>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </template>
      </el-table>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {onMounted, useAttrs, useSlots, watch} from "vue";
import {reactive, ref} from "vue";
import _ from "lodash";
import TableColumn from "./components/TableColumn/index.vue";

const superFormRef = ref()
const superTableRef = ref()
const attrs = useAttrs()
const slots = useSlots()
const props = defineProps<{
  searchConfig: any,
  tableColumn: Array<any>
}>()
const emits = defineEmits<{
  // 表格搜索-查询
  (e: 'search', data: any): void
  // 表格搜索-重置
  (e: 'reset'): void
}>()
// 初始化的查询参数，需初始化存储
const freezeQuery = ref(props.searchConfig?.defaultQuery)

let formData = ref()
watch(() => freezeQuery.value, (newV) => {
  if (newV) {
    formData.value = _.cloneDeep(newV)
  }
}, {
  deep: true,
  immediate: true,
  once: true
})

onMounted(() => {
})
/**
 * 获取搜索表单查询内容
 */
const getFormData = () => {
  return superFormRef.value.getFormData()
}
/**
 * 表格搜索-查询
 * @param data 搜索表单数据
 */
const search = (data: any) => {
  emits('search', data)
}
/**
 * 表格搜索-重置
 */
const reset = () => {
  formData.value = freezeQuery.value ? _.cloneDeep(freezeQuery.value) : {}
  emits('reset')
}
defineExpose({
  getSearchFormData: getFormData,
  superTableRef,
})
</script>

<style scoped lang="scss">
.operate-btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .collapse-toggle {
    padding-left: 10px;
    font-size: 13px;
    color: var(--el-color-primary);
    cursor: pointer;

    .el-icon {
      padding-left: 4px;
    }
  }
}
</style>
