import DefaultTheme  from 'vitepress/theme'
import {Theme} from "vitepress";
import superComponents from '@yangjiaxin/super-components'
import "element-plus/dist/index.css";
import ElementPlus from 'element-plus'
import Demo from './components/Demo.vue'
import {defineAsyncComponent} from "vue";
import './custom.css'
import zhCn from "element-plus/es/locale/lang/zh-cn";
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Demo', Demo)
    app.use(ElementPlus, {
      locale: zhCn
    })
    app.use(superComponents, {
      globalTableConfig: {
        pageKey: 'page',
        pageSizeKey: 'pageSize',
        listKey: 'list',
        totalKey: 'total',
      }
    })
    const components = import.meta.glob('../../example/*/*.vue');
    // 遍历组件模块实现自动注册
    for (const [key, value] of Object.entries(components)) {
      // 拼接组件注册的 name
      const componentName = key.replace('../../example/', '').replace(/\/|\.vue/g, '');
      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(value as any));
    }
  }
} satisfies Theme
