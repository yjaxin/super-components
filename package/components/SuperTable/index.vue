<template>
  <div class="super-table-container">
    <header v-if="props.searchConfig?.formConfigList">
      <super-form
        ref="superFormRef"
        v-model="formData"
        v-bind="props.searchConfig"
        :show-footer="false"
        showWidthTable
        label-position="left"
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
        :data="tableData"
      >
        <template
          v-for="(column, colIndex) in props.tableColumn"
          :key="colIndex">
          <!--    表头header插槽      -->
          <table-column v-bind="column">
            <template v-for="(_, key, index) in slots" :key="index" #[key]="{ row, column, $index }">
              <slot :name="key" :row="row" :column="column" :$index="$index"></slot>
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
      <el-pagination
        v-if="defaultPaginationConfig.pagination"
        v-model:current-page="currentPage"
        v-model:page-size="defaultPaginationConfig.curPageSize"
        :page-sizes="defaultPaginationConfig.pageSize"
        :size="defaultPaginationConfig.size"
        :background="defaultPaginationConfig.background"
        :layout="defaultPaginationConfig.layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
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
// 表格数据
const tableData = ref([])
const defaultPaginationConfig = ref({
  pagination: true,
  pageSize : [10, 20, 50, 100],
  curPageSize: 10,
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  size: 'default'
})
interface PaginationConfig {
  pagination?: boolean;
  pageSize?: Array<number>;
  curPageSize?: number;
  layout?: string,
  background?: any,
  size?: string,
}

interface Props {
  searchConfig: any;
  tableColumn: Array<any>;
  paginationConfig?: PaginationConfig;
  remoteMethod?: Function;
  data?: Array<any>
}
const props = withDefaults(defineProps<Props>(), {
  searchConfig: {},
})
const emits = defineEmits<{
  // 表格搜索-查询
  (e: 'search', data: any): void
  // 表格搜索-重置
  (e: 'reset'): void
  // 分页大小切换
  (e: 'size-change', size: number): void
  // 分页切换
  (e: 'current-change', page: number): void
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
// 分页器配置
watch(() => props.paginationConfig, (newConfig:PaginationConfig) => {
  defaultPaginationConfig.value = Object.assign(defaultPaginationConfig.value, newConfig)
}, {
  deep: true,
  immediate: true
})

// 表格数据
watch(() => props.data, (newData: Array<any>) => {
  // 使用远程搜索时传入的data不会被赋值
  if(props.remoteMethod) {
    tableData.value = newData
  }
}, {
  deep: true,
  immediate: true
})

onMounted(async () => {
  initRemoteMethod()
})
/**
 * 初始化表格数据
 */
// 查询参数
const queryParams = ref({})
const initRemoteMethod = () => {
  // 是否远程搜索
  if(props.remoteMethod && _.isFunction(props.remoteMethod)) {
    queryParams.value = props.searchConfig?.defaultQuery ?? {}
    getTableDataByRemoteMethod()
  }
}

// 初始化获取表格数据
const getTableDataByRemoteMethod = async () => {
  // 开启分页
  if(defaultPaginationConfig.value.pagination) {
    queryParams.value['page'] = currentPage.value
    queryParams.value['pageSize'] = defaultPaginationConfig.value.curPageSize
  }
  console.log(queryParams.value)
  const res = await props.remoteMethod(queryParams.value)
}
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
  queryParams.value = data
  getTableDataByRemoteMethod()
  emits('search', data)
}
/**
 * 表格搜索-重置
 */
const reset = () => {
  formData.value = freezeQuery.value ? _.cloneDeep(freezeQuery.value) : {}
  queryParams.value = _.cloneDeep(formData.value)
  getTableDataByRemoteMethod()
  emits('reset')
}

// 表格数据总条数
const total = ref(props?.data?.length ?? 0)
// 当前页码
const currentPage = ref(1)
/**
 * 分页大小切换
 * @param val
 */
const handleSizeChange = (val: number) => {
  defaultPaginationConfig.value.curPageSize = val
  getTableDataByRemoteMethod()
  emits('size-change', val)
}

/**
 * 分页切换
 * @param val
 */
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getTableDataByRemoteMethod()
  emits('current-change', val)
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

footer {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 20px;
}
</style>
