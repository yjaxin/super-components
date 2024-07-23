# Table 表格
用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。
## 基础表格
基础的表格展示用法。

当 `super-table` 元素中注入 `data` 对象数组后，在 `data` 对象中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。 可以使用 `width` 属性来定义列宽。

<Demo url="Table/index.vue">

<<< @/example/Table/index.vue

</Demo>

## 显示溢出工具提示的表格
当内容太长时，它会分成多行。您可以使用 `show-overflow-tooltip` 将其保留在一行中。
属性 `show-overflow-tooltip` 接受一个布尔值。 为 `true` 时多余的内容会在 `hover` 时以 `tooltip` 的形式显示出来。

<Demo url="Table/table-show-overflow-tip.vue">

<<< @/example/Table/table-show-overflow-tip.vue

</Demo>

## 固定表头
纵向内容过多时，可选择固定表头。
只要在 `SuperComponents` 元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。

<Demo url="Table/table-fixed-header.vue">

<<< @/example/Table/table-fixed-header.vue

</Demo>

## 固定列
横向内容过多时，可选择固定列。
固定列需要使用 `fixed` 属性，它接受 `Boolean` 值。 如果为 `true`, 列将被左侧固定. 它还接受传入字符串，`left` 或 `right`，表示左边固定还是右边固定。

<Demo url="Table/table-fixed-column.vue">

<<< @/example/Table/table-fixed-column.vue

</Demo>

## 固定列和表头
当您有大量数据块放入表中，您可以同时固定表头和列。
固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。

<Demo url="Table/table-fixed-header-column.vue">

<<< @/example/Table/table-fixed-header-column.vue

</Demo>

## 流体高度
当数据量动态变化时，可以为 Table 设置一个最大高度。
通过设置 `max-height` 属性为 `super-table` 指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条。

<Demo url="Table/table-fluid-height.vue">

<<< @/example/Table/table-fluid-height.vue

</Demo>

## 多级表头
数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

只需要在 `tableColumn` 配置项中新增children配置，你可以实现组合表头。

<Demo url="Table/table-multistage.vue">

<<< @/example/Table/table-multistage.vue

</Demo>

## 单选
选择单行数据时使用色块表示。

Table 组件提供了单选的支持， 只需要配置 `highlight-current-row` 属性即可实现单选。 之后由 `current-change` 事件来管理选中时触发的事件，它会传入 
`currentRow`，`oldCurrentRow`。 如果需要显示索引，可以增加一项 `{type: index}`，设置 type 属性为 index 即可显示从 1 开始的索引号。

<Demo url="Table/table-select-single.vue">

<<< @/example/Table/table-select-single.vue

</Demo>

## 多选
你也可以选择多行。

实现多选非常简单: 在`tableColumn`添加一列 `{ type: selection, width: 80 }`，即可；

<Demo url="Table/table-select-multiple.vue">

<<< @/example/Table/table-select-multiple.vue

</Demo>

## 排序
对表格进行排序，可快速查找或对比数据。

在列中设置 `sortable` 属性即可实现以该列为基准的排序， 接受一个 `Boolean`，默认为 `false`。 可以通过 `Table` 的 `default-sort` 属性设置默认的排序列和排序顺序。 可以使用
`sort-method` 或者 `sort-by` 使用自定义的排序规则。 如果需要后端排序，需将 `sortable` 设置为 `custom`，同时在 `Table` 上监听 `sort-change` 事件， 在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。 在本例中，我们还使用了 `formatter` 属性，它用于格式化指定列的值， 接受一个 `Function`，会传入两个参数：`row` 和 `column`， 可以根据自己的需求进行处理。

<Demo url="Table/table-sort.vue">

<<< @/example/Table/table-sort.vue

</Demo>

## 筛选
对表格进行筛选，可快速查找到自己想看的数据。

在列中设置 `filters` 和 `filter-method` 属性即可开启该列的筛选， `filters` 是一个数组，`filter-method` 是一个方法，它用于决定某些数据是否显示， 会传入三个参数：`value`, `row` 和 `column`。


<Demo url="Table/table-filter.vue">

<<< @/example/Table/table-filter.vue

</Demo>

## 自定义列模板
自定义列的显示内容，可组合其他组件使用。

通过 `slot` 可以获取到 row, column, $index 的数据，用法参考 demo。

<Demo url="Table/table-custom-column.vue">

<<< @/example/Table/table-custom-column.vue

</Demo>

## 自定义表头
表头支持自定义。

通过设置 `headerSlot` 来自定义表头。

<Demo url="Table/table-custom-header.vue">

<<< @/example/Table/table-custom-header.vue

</Demo>

## 展开行
当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。

通过设置 `{type: 'expand', slotName: 'name'}` 可以开启展开行功能， 内置的 `el-table-column` 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 
`slot` 相同。

<Demo url="Table/table-expand.vue">

<<< @/example/Table/table-expand.vue

</Demo>

## 树形数据与懒加载
支持树类型的数据的显示。 当 `row` 中包含 `children` 字段时，被视为树形数据。 渲染嵌套数据需要 `prop` 的 `row-key`。 此外，子行数据可以异步加载。 设置 `Table` 的`lazy`属性为 `true` 与加载函数 `load` 。 通过指定 `row` 中的`hasChildren`字段来指定哪些行是包含子节点。 `children` 与`hasChildren`都可以通过 `tree-props` 配置。

<Demo url="Table/table-tree.vue">

<<< @/example/Table/table-tree.vue

</Demo>

## 表尾合计行
若表格展示的是各类数字，可以在表尾显示各列的合计。
将 `show-summary` 设置为`true`就会在表格尾部展示合计行。 默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过`sum-text`配置），其余列会将本列所有数值进行求合操作，并显示出来。 当然，你也可以定义自己的合计逻辑。 使用 `summary-method` 并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中，可以是一个 `VNode` 或 `String`， 具体可以参考本例中的第二个表格。

<Demo url="Table/table-summary.vue">

<<< @/example/Table/table-summary.vue

</Demo>

## 合并行或列
多行或多列共用一个数据时，可以合并行或列。
通过给 `table` 传入`span-method`方法可以实现合并行或列， 方法的参数是一个对象，里面包含当前行 `row`、当前列 `column`、当前行号 `rowIndex`、当前列号 `columnIndex` 四个属性。 该函数可以返回一个包含两个元素的数组，第一个元素代表 `rowspan`，第二个元素代表 `colspan`。 也可以返回一个键名为 `rowspan` 和 `colspan` 的对象。

<Demo url="Table/table-span.vue">

<<< @/example/Table/table-span.vue

</Demo>

## 自定义索引
通过设置列配置 `{type: index, index: () => {}}` 可以自定义索引。 该属性传入数字时，将作为索引的起始值。 也可以传入一个方法，它提供当前行的行号（从 0 
开始）作为参数，返回值将作为索引展示。

<Demo url="Table/table-custom-index.vue">

<<< @/example/Table/table-custom-index.vue

</Demo>

## 表格布局
通过属性 `table-layout` 可以指定表格中单元格、行和列的布局方式

<Demo url="Table/table-layout.vue">

<<< @/example/Table/table-layout.vue

</Demo>

## Table API

### Table 属性
完全支持element-plus Table属性。[官方文档](https://element-plus.org/zh-CN/component/table.html#table-api)
### Table 事件
完全支持element-plus Table事件。[官方文档](https://element-plus.org/zh-CN/component/table.html#table-api)
### Table Expose
完全支持element-plus Table Expose的事件，具体使用见Demo。[官方文档](https://element-plus.org/zh-CN/component/table.html#table-api)

<Demo url="Table/table-expose.vue">

<<< @/example/Table/table-expose.vue

</Demo>

## Table-column API

### Table-column 属性
完全支持element-plus Table-column官方属性。[官方文档](https://element-plus.org/zh-CN/component/table.html#table-column-%E6%8F%92%E6%A7%BD)

### Table-column 插槽

表头插槽：tableColumn中配置 `headerSlot` 属性 

默认插槽：tableColumn中配置 `slotName` 属性 

<Demo url="Table/table-header-slot.vue">

<<< @/example/Table/table-header-slot.vue

</Demo>





