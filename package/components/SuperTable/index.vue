<template>
  <div class="super-table-container">
    <header>
      <super-form
        ref="superFormRef"
        v-model="formData"
        :spanConfig="{
          col: 3,
        }"
        v-bind="props.searchConfig"
        :show-footer="false"
        showWidthTable
      >
      </super-form>
    </header>
    <main>
      <el-table
        :header-cell-style="{ background: '#f1f1f1' }"
        v-loading
        border
        v-bind="attrs">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import {useAttrs} from "vue";
import {reactive, ref} from "vue";
import {SuperFormItemType} from "@/components/SuperForm/index.d.ts";

const superFormRef = ref()
const attrs = useAttrs()
const props = defineProps<{
  searchConfig: any
}>()
const formData = reactive({
  a: '3331'
})

const getFormData = () =>{
  return superFormRef.value.getFormData()
}

defineExpose({
  getFormData
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
