<template>
  <super-table :data="tableData" @cell-click="cellClick"></super-table>
</template>
<script setup lang="ts">

const tableData = [
  {
    date: '2016-05-0311111111',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const cellClick =(row) => {
  console.log(row)
}
</script>
<style scoped lang="scss">
</style>
