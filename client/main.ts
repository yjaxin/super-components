import { createApp } from "vue";
import "element-plus/dist/index.css";
import ElementPlus from 'element-plus'
// import superComponents from '@yangjiaxin/super-components'
import App from "./App.vue";


const app = createApp(App);

const modules = import.meta.glob('../package/components/**/*.vue', {eager: true})
const getModuleName = (path: string) => {
  const reg = /\/components\/([^\/]+)/
  return path.match(reg)[1]
}
let moduleMap = {}
Object.entries(modules).forEach((module: any): void => {
  app.component(getModuleName(module[0]), module[1].default)
})

app.use(ElementPlus)
// app.use(superComponents)
app.mount("#app");
