<template>
  <div class="super-table-container">
    <header></header>
    <main>
      <el-table
        :header-cell-style="{ background: '#f1f1f1' }"
        v-loading
        border
        v-bind="attrs" >
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
const attrs = useAttrs()
</script>

<style scoped lang="scss">

</style>
