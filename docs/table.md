# Table 表格
用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。
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
