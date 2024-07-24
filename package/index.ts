
const modules = import.meta.glob('./components/**/*.vue', {eager: true})
const getModuleName = (path: string) => {
  const reg = /\/components\/([^\/]+)/
  return path.match(reg)[1]
}
let moduleMap = {}
Object.entries(modules).forEach((module: any): void => {
  moduleMap[getModuleName(module[0])] = module[1].default
})
interface OptionsType {
  globalTableConfig?: {
    pageKey?: string,
    pageSizeKey?: string,
    listKey?: string,
    totalKey?: string,
  }
}
// 批量组件注册
const install: any = function (Vue: any, options?: OptionsType): void {
  if(install.installed) return
  Object.entries(moduleMap).forEach((com: any): void => {
    if(options?.globalTableConfig) {
      if(com[0] == 'SuperTable') {
        com[1].props['globalTableConfig'].default = Object.assign(com[1].props['globalTableConfig'].default, options.globalTableConfig)
      }
    }
    Vue.component(com[0], com[1])
  })
};
export default install;

