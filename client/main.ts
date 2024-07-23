import { createApp } from "vue";
import "element-plus/dist/index.css";
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import superComponents from '@yangjiaxin/super-components'
import App from "./App.vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";


const app = createApp(App);

const modules = import.meta.glob('../package/components/**/*.vue', {eager: true})
const getModuleName = (path: string) => {
  const reg = /\/components\/([^\/]+)/
  return path.match(reg)[1]
}
Object.entries(modules).forEach((module: any): void => {
  app.component(getModuleName(module[0]), module[1].default)
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn })
// app.use(superComponents)
app.mount("#app");
