<template>
  <!-- 单级表头 -->
  <el-table-column v-bind="attrs" v-if="!attrs.children || !attrs.children.length">
    <!--  表头插槽  -->
    <template v-if="attrs.headerSlot" #header="scope">
      <slot :name="attrs.headerSlot" v-bind="scope"></slot>
    </template>
    <!--  内容插槽  -->
    <template v-if="attrs.slotName" #default="scope">
      <slot :name="attrs.slotName" v-bind="scope"></slot>
    </template>
  </el-table-column>
  <!-- 多级表头 -->
  <el-table-column
    v-else
    v-bind="attrs">
    <template v-if="attrs.headerSlot" #header="scope">
      <slot :name="attrs.headerSlot" v-bind="scope"></slot>
    </template>
    <template
      v-for="(column, index) in attrs.children"
      :key="index">
      <table-column v-bind="column">
        <template v-for="(_, key ,index) in slots" :key="index" #[key]>
          <slot :name="key" />
        </template>
      </table-column>
    </template>
  </el-table-column>
  <a></a>
</template>

<script setup lang="ts">
import TableColumn from './index.vue'
import {useAttrs, useSlots} from "vue";

const attrs = useAttrs()
const slots = useSlots()
const props = defineProps<{}>()
</script>

<style scoped lang="scss">
a {
  display: none
}
</style>
