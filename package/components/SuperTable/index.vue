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
    <div class="toolbar" v-if="slots.toolbar">
      <slot name="toolbar"></slot>
    </div>
    <main>
      <el-table
        ref="superTableRef"
        :header-cell-style="{ background: '#f1f1f1' }"
        v-loading="loading"
        border
        v-bind="attrs"
        :data="tableData"
      >
        <template
          v-for="(column) in props.tableColumn"
          :key="column.label">
          <!--    表头header插槽      -->
          <table-column v-bind="column">
            <template v-for="(_, key, index) in slots" :key="index" #[key]="{ row, column, $index }">
              <slot :name="key" :row="row" :column="column" :$index="$index"></slot>
            </template>
          </table-column>
        </template>
      </el-table>
    </main>
    <footer>
      <el-pagination
        v-if="defaultPaginationConfig.pagination"
        v-model:current-page="currentPage"
        v-model:page-size="defaultPaginationConfig.curPageSize"
        :page-sizes="defaultPaginationConfig.pageSizes"
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
import { onMounted, useAttrs, useSlots, watch} from "vue";
import {reactive, ref} from "vue";
import _ from "lodash";
import TableColumn from "./components/TableColumn/index.vue";

const superFormRef = ref()
const superTableRef = ref()
const attrs = useAttrs()
const slots = useSlots()
const loading = ref(false)

// 表格数据
const tableData = ref([])
const defaultPaginationConfig = ref({
  pagination: true,
  pageSizes: [10, 20, 50, 100],
  curPageSize: 10,
  layout: 'total, sizes, prev, pager, next, jumper',
  background: false,
  size: 'default'
})

interface PaginationConfig {
  pagination?: boolean;
  pageSizes?: Array<number>;
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
  globalTableConfig?: any;
  data?: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  searchConfig: {},
  globalTableConfig: {
    pageKey: 'page',
    pageSizeKey: 'pageSize',
    listKey: 'list',
    totalKey: 'total',
  }
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
    formData.value = _.cloneDeep({ ...formData.value, ...newV,})
  }
}, {
  deep: true,
  immediate: true,
})

// 分页器配置
watch(() => props.paginationConfig, (newConfig: PaginationConfig) => {
  defaultPaginationConfig.value = Object.assign(defaultPaginationConfig.value, newConfig)
}, {
  deep: true,
  immediate: true
})

// 表格数据
watch(() => props.data, (newData: Array<any>) => {
  // 使用远程搜索时传入的data不会被赋值
  if (!props.remoteMethod) {
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
  if (props.remoteMethod && _.isFunction(props.remoteMethod)) {
    queryParams.value = props.searchConfig?.defaultQuery ?? {}
    getTableDataByRemoteMethod()
  }
}

// 初始化获取表格数据
const getTableDataByRemoteMethod = async () => {
  if (!props.remoteMethod) return
  // 开启分页
  if (defaultPaginationConfig.value.pagination) {
    queryParams.value[props.globalTableConfig.pageKey] = currentPage.value
    queryParams.value[props.globalTableConfig.pageSizeKey] = defaultPaginationConfig.value.curPageSize
  }
  loading.value = true
  const res = await props.remoteMethod(queryParams.value)
  loading.value = false
  // 表格数据key是否正确
  if (res.data.hasOwnProperty(props.globalTableConfig.listKey)) {
    tableData.value = res.data[props.globalTableConfig.listKey]
  } else {
    ERROR(`property ${props.globalTableConfig.listKey} is not exit`)
  }
  if (res.data.hasOwnProperty(props.globalTableConfig.totalKey)) {
    total.value = res.data[props.globalTableConfig.totalKey]
  } else {
    ERROR(`property ${props.globalTableConfig.totalKey} is not exit`)
  }
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
  currentPage.value = 1
  getTableDataByRemoteMethod()
  emits('search', data)
}
/**
 * 表格搜索-重置
 */
const reset = async () => {
  formData.value = freezeQuery.value ? _.cloneDeep(freezeQuery.value) : {}
  queryParams.value = _.cloneDeep(formData.value)
  currentPage.value = 1
  await getTableDataByRemoteMethod()
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
  currentPage.value = 1
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

const ERROR = (error: string) => {
  throw Error(error)
}
defineExpose({
  getSearchFormData: getFormData,
  superTableRef,
})
</script>

<style scoped lang="scss">

.toolbar {
  margin-bottom: 20px;
}

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
