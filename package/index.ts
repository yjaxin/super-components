
const modules = import.meta.glob('./components/**/*.vue', {eager: true})
const getModuleName = (path: string) => {
  const reg = /\/components\/([^\/]+)/
  return path.match(reg)[1]
}
let moduleMap = {}
Object.entries(modules).forEach((module: any): void => {
  moduleMap[getModuleName(module[0])] = module[1].default
})
// 批量组件注册
const install = function (Vue: any): void {
  Object.entries(moduleMap).forEach((com: any): void => {
    Vue.component(com[0], com[1])
  })
};
export default install;

