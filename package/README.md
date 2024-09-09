# 安装

## 兼容性
Super Components 支持最近两个版本的浏览器。

如果您需要支持旧版本的浏览器，请自行添加 Babel 和相应的 Polyfill 。

由于 Vue 3 不再支持 IE11，Super Components 也不再支持 IE 浏览器。

## 使用包管理器
**我们建议您使用包管理器（如 NPM、[Yarn](https://classic.yarnpkg.com/lang/en/) 或 [pnpm](https://pnpm.io/)安装 Super Components**，然后您就可以使用打包工具，例如
[Vite](https://vitejs.dev/) 或 [webpack](https://webpack.js.org/)。
```
# 选择一个你喜欢的包管理器

# NPM
$ npm install @yangjiaxin/super-components --save

# Yarn
$ yarn add @yangjiaxin/super-components

# pnpm
$ pnpm install @yangjiaxin/super-components
```

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
