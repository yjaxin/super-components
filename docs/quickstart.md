# 快速开始
本节将介绍如何在项目中使用 Super Components。
# 用法
本库依赖ElementPlus，需要先注册ElementPlus。
## 完整引入 
```js
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import SuperComponents from '@yangjiaxin/super-components'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)

/**
 * 此处配置为表格接口查询字段key设置
 * 默认值为
 * {pageKey: 'page',pageSizeKey: 'pageSize',listKey: 'list',totalKey: 'total'}
**/

app.use(SuperComponents, {
  pageKey: 'page', // 远程搜索请求参数 page
  pageSizeKey: 'pageSize', // 远程搜索请求参数 pageSize
  listKey: 'list', // 远程搜索接口响应 list（表格数据）
  totalKey: 'total', // 远程搜索接口响应 total（数据总数）
})
app.mount('#app')
```
