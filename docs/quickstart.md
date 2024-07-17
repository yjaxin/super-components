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
app.use(SuperComponents)
app.mount('#app')
```
