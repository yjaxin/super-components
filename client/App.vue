<template>
  <div>
    <div class="table">
      <super-table
        @search="search"
        ref="superTableRef"
        :tableColumn="tableColumn"
        @selection-change="selectchange"
        :searchConfig="searchConfig"
        @current-change="curPageChange"
        :remoteMethod="getTableDataApi"
      >
        <template #toolbar>
          <el-button>123</el-button>
          <el-button>22</el-button>
          <el-button>22</el-button>
        </template>
      </super-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {SuperFormItemType} from "@/components/SuperForm/index.d";

const superTableRef = ref()
onMounted(() => {
})
const selectchange = (e: any) => {
  console.log(e)
}

const curPageChange = () => {
}
const request = (params) => {

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {name: '张三', age: 13, address: '重庆市'},
            {name: '张三', age: 13, address: '重庆市'},
            {name: '张三', age: 13, address: '重庆市'},
          ],
          total: 3
        }
      })
    }, 2000)
  })
}
const getTableDataApi = (data) => {
  return request({url: 'xxx', data})
}
const tableColumn = ref([
  {
    type: 'index',
    width: 60
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'address',
    label: '地址',
    width: 520,
  }
])
const search = (data: any) => {
  console.log(data)
}
let options = ref([])
const formItemListClone = ref<Array<SuperFormItemType>>(
  [
    {
      prop: 'ElSelect',
      label: 'ElSelect',
      componentName: "ElSelect",
      componentAttr: {
        options,
      },
      events: {
        change: (v) => {
          searchConfig.value.defaultQuery.ElInput = v
        }
      }
    },
    {
      prop: 'ElInput',
      label: 'ElInput',
      componentName: "ElInput",
      formItemAttr: {},
    },
    {
      prop: 'ElDatePicker',
      label: 'ElDatePicker',
      componentName: "ElDatePicker",
      formItemAttr: {},
      componentAttr: {
        type: "daterange",
        placeholder: '请选择',
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期"
      }
    },
    {
      prop: 'ElInput1',
      label: 'ElInput1',
      componentName: "ElInput",
    },
    {
      prop: 'ElInput2',
      label: 'ElInput1',
      componentName: "ElInput",
    }
  ]
)
onMounted(() => {
  setTimeout(() => {
    options.value = [{label: 1, value: 1}]
  }, 300)
})

const searchConfig = ref({
  formConfigList: formItemListClone.value,
  defaultQuery: {ElInput: 22}
})


const obj: any = {
  foo: 123,
  bar: 456
}
// obj[Symbol.toStringTag] = 'a'
// console.log(obj.toString())
obj[Symbol.iterator] = () => {
  const keys = Object.keys(obj)
  return {
    next: () => {
      const done = keys.length === 0
      const key = done ? undefined : keys.shift()
      const value = done ? undefined : {[key]: obj[key]}
      return {value, done}
    }
  }
}
const name = Symbol('name')

const a = () => {
  return Promise.resolve(1)
}
const b = () => {
  return Promise.resolve(2)
}
const c = () => {
  return Promise.resolve(3)
}

const funcQueue = [a, b, c]

function* foo() {
  let i = 0
  while (true) {
    yield funcQueue[i]
    i++
  }
}

const Foo = foo()

const showNextPopup = async () => {
  const { done, value } = Foo.next()
  if(!done && value) {
    const res = await value()
    console.log(res)
  }
}

showNextPopup()
showNextPopup()
showNextPopup()

// console.log(aResult)

// console.log(Foo.next())
// console.log(Foo.next())
// console.log(Foo.next())
// console.log(name[Symbol])
// const iterator = obj[Symbol.iterator]()
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// for (const value of obj) {
//   console.log(value)
// }
// const array = [1]
// const iterator = array[Symbol.iterator]()
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// for (const item of obj){
//   console.log(item)
// }

</script>
<style scoped lang="scss">
.form {
  margin-top: 50px;
}
</style>
