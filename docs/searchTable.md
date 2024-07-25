# 带搜索表单的表格

添加搜索表单并与表格数据进行联动。

## 基础使用

在super-table上新增属性`searchConfig`，开启搜索表单。

<Demo url="SearchTable/index.vue">

<<< @/example/SearchTable/index.vue

</Demo>

## 搜索表单校验

在 `searchConfig` 必填表单项中 `formItemAttr` 属性中新增 `rules` 配置，在查询时会对表单必填项进行校验。

<Demo url="SearchTable/searchTable-required.vue">

<<< @/example/SearchTable/searchTable-required.vue

</Demo>

## 搜索表单布局

在 `searchConfig` 新增 `spanConfig: { col: 3 }`属性来调整每行展示的表单项个数。

<Demo url="SearchTable/searchTable-col.vue">

<<< @/example/SearchTable/searchTable-col.vue

</Demo>

## 表单 查询/重置 事件

super-table 新增事件`search`和`reset`

<Demo url="SearchTable/searchTable-search-btn.vue">

<<< @/example/SearchTable/searchTable-search-btn.vue

</Demo>

## 表单默认值

在 `searchConfig` 添加 `defaultQuery`，设置表单默认值；设置默认值后重置会重置为defaultQuery。

<Demo url="SearchTable/searchTable-defaultQuery.vue">

<<< @/example/SearchTable/searchTable-defaultQuery.vue

</Demo>

## 远程搜索

添加`remoteMethod`属性，该属性接收一个`promise`返回值，具体使用见demo。

<Demo url="SearchTable/searchTable-remoteMethod.vue">

<<< @/example/SearchTable/searchTable-remoteMethod.vue

</Demo>

## 表单项值预处理

可对表单项值进行预处理，例如：原本时间段选择值为`dataRange:[2024-07-25, 2024-07-26]`
，需转换为`startTime: 2024-07-25, endTime: 2024-07-26`

<Demo url="SearchTable/searchTable-transform.vue">

<<< @/example/SearchTable/searchTable-transform.vue

</Demo>

## 属性

带搜索表格新增配置

| 属性名              | 说明       | 类型                 | default                                                                                                                                                   |
|------------------|----------|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| searchConfig     | 搜索表单相关配置 | `searchConfig`     | ——                                                                                                                                                        |
| paginationConfig | 分页器配置    | `paginationConfig` | `{ pagination: true, pageSizes: [10, 20, 50, 100], curPageSize:10, layout:'total, sizes, prev, pager, next, jumper', background: false, size: 'default'}` |
| remoteMethod     | 远程查询方法   | `Promise`          | ——                                                                                                                                                        |

### 搜索表单配置

搜索表单相关配置

#### searchConfig

| 属性名            | 说明      | 类型                      | default      |
|----------------|---------|-------------------------|--------------|
| spanConfig     | 表格布局配置  | `Object`                | `{ col: 4 }` |
| formConfigList | 搜索表单配置  | `Array<formItemConfig>` | ——           |
| defaultQuery   | 搜索表单默认值 | `Object`                | ——           |

#### formItemConfig

| 属性名           | 说明                                                                                                                                                                                | 类型         | default |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|---------|
| prop          | model键名                                                                                                                                                                           | `string`   | ——      |
| label         | 标签文本                                                                                                                                                                              | `string`   | ——      |
| componentName | 组件名称(支持所有Element-plus表单组件)                                                                                                                                                        | `string`   | ——      |
| formItemAttr  | 表单项配置，与el-form-item 属性配置一致，属性名称可使用小驼峰 [FormItem Attributes](https://element-plus.<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>org/zh-CN/component/form.html#form-attributes) | `Object`   | ——      |
| componentAttr | 组件配置，与element-plus表单组件属性配置一致，属性名称可使用小驼峰 [Components Attributes](https://element-plus.org/zh-CN/component/autocomplete.<br/>html)       <br/>                                      | `Object`   | ——      |
| events        | 组件事件，与element-plus表单组件事件配置一致 [Components Attributes](https://element-plus.org/zh-CN/component/autocomplete.html)                                                                  | `Object`   | ——      |
| transform     | 表单项值预处理                                                                                                                                                                           | `Funciton` | ——      |

#### spanConfig

| 属性名 | 说明        | 类型       | default |
|-----|-----------|----------|---------|
| col | 每行展示的表单项数 | `number` | 4       |

### 分页器配置

#### paginationConfig

| 属性名         | 说明             | 类型              | default                           |
|-------------|----------------|-----------------|-----------------------------------|
| pagination  | 是否开启分页         | `boolean`       | true                              |
| pageSizes   | 每页显示个数选择器的选项设置 | `Array<number>` | [10, 20, 50, 100]                 |
| curPageSize | 当前分页数据量        | `number`        | 10                                |
| layout      | 组件布局，子组件名用逗号分隔 | `object`        | 	prev, pager, next, jumper, total |
| background  | 是否为分页按钮添加背景色   | `boolean`       | 	false                            |

## 事件

| 名称             | 说明     | 类型                          |
|----------------|--------|-----------------------------|
| search         | 查询     | `(formModal: any) => void`  |
| reset          | 重置     | `() => void`                |
| size-change    | 分页大小切换 | `(size: number) => void`    |
| current-change | 分页切换   | `(curPage: number) => void` |

## 插槽

| 名称      | 说明             | 
|---------|----------------|
| toolbar | 表格上方自定义toolbar | 
