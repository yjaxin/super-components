# 带搜索表单的表格

添加搜索表单并与表格数据进行联动。

## 表单配置

### searchConfig

| 属性名            | 说明        | 类型                      | default |
|----------------|-----------|-------------------------|---------|
| spanConfig     | 每行展示的表单项数 | `Object`                | 4       |
| formConfigList | 搜索表单配置    | `Array<formItemConfig>` | ——      |
| defaultQuery   | 搜索表单默认值   | `Object`                | ——      |

## 表单项配置

### formItemConfig

| 属性名           | 说明                                                                                              | 类型         | default |
|---------------|-------------------------------------------------------------------------------------------------|------------|---------|
| prop          | model键名                                                                                         | `string`   | ——      |
| label         | 标签文本                                                                                            | `string`   | ——      |
| componentName | 组件名称(支持所有Element-plus表单组件)                                                                      | `string`   | ——      |
| formItemAttr  | 表单项配置 [FormItem Attributes](https://element-plus.org/zh-CN/component/form.html#form-attributes) | `Object`   | ——      |
| componentAttr | 组件配置 [Components Attributes](https://element-plus.org/zh-CN/component/autocomplete.html)        | `Object`   | ——      |
| events        | 组件事件 [Components Attributes](https://element-plus.org/zh-CN/component/autocomplete.html)        | `Object`   | ——      |
| transform     | 表单项值预处理                                                                                         | `Funciton` | ——      |

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

