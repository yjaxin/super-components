<template>
  <div>
    <super-table
      :tableColumn="tableColumn"
      :data="sourceData">
    </super-table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sourceData = ref([
  {
    date: '2024-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2024-05-02',
    name: 'Bob',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2024-05-04',
    name: 'Mary',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])
const tableColumn = ref([
  {
    label: 'Date',
    prop: 'date'
  },
  {
    label: 'Delivery Info',
    children: [
      {
        label: 'Name',
        prop: 'name'
      },
      {
        label: 'Address Info',
        children: [
          {
            label: 'State',
            prop: 'state'
          },
          {
            label: 'City',
            prop: 'city'
          },
          {
            label: 'Address',
            prop: 'address'
          }
        ]
      }
    ]
  },

])


</script>

