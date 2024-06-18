const componentNames = ["ElAffix", "ElAlert", "ElAnchor", "ElAnchorLink", "ElAside", "ElAutoResizer", "ElAutocomplete", "ElAvatar", "ElBacktop", "ElBadge", "ElBreadcrumb", "ElBreadcrumbItem", "ElButton", "ElButtonGroup", "ElCalendar", "ElCard", "ElCarousel", "ElCarouselItem", "ElCascader", "ElCascaderPanel", "ElCheckTag", "ElCheckbox", "ElCheckboxButton", "ElCheckboxGroup", "ElCol", "ElCollapse", "ElCollapseItem", "ElCollapseTransition", "ElCollection", "ElCollectionItem", "ElColorPicker", "ElConfigProvider", "ElContainer", "ElCountdown", "ElDatePicker", "ElDescriptions", "ElDescriptionsItem", "ElDialog", "ElDivider", "ElDrawer", "ElDropdown", "ElDropdownItem", "ElDropdownMenu", "ElEmpty", "ElFooter", "ElForm", "ElFormItem", "ElHeader", "ElIcon", "ElImage", "ElImageViewer", "ElInfiniteScroll", "ElInput", "ElInputNumber", "ElLink", "ElLoading", "ElLoadingDirective", "ElLoadingService", "ElMain", "ElMenu", "ElMenuItem", "ElMenuItemGroup", "ElMessage", "ElMessageBox", "ElNotification", "ElOption", "ElOptionGroup", "ElOverlay", "ElPageHeader", "ElPagination", "ElPopconfirm", "ElPopover", "ElPopoverDirective", "ElPopper", "ElPopperArrow", "ElPopperContent", "ElPopperTrigger", "ElProgress", "ElRadio", "ElRadioButton", "ElRadioGroup", "ElRate", "ElResult", "ElRow", "ElScrollbar", "ElSegmented", "ElSelect", "ElSelectV2", "ElSkeleton", "ElSkeletonItem", "ElSlider", "ElSpace", "ElStatistic", "ElStep", "ElSteps", "ElSubMenu", "ElSwitch", "ElTabPane", "ElTable", "ElTableColumn", "ElTableV2", "ElTabs", "ElTag", "ElText", "ElTimePicker", "ElTimeSelect", "ElTimeline", "ElTimelineItem", "ElTooltip", "ElTour", "ElTourStep", "ElTransfer", "ElTree", "ElTreeSelect", "ElTreeV2", "ElUpload", "ElWatermark"] as const
type ArrayToUnion<T extends readonly string[]> = T[number];
type ComponentsType = ArrayToUnion<typeof componentNames>;

export declare interface ItemConfig {
  prop: string,
  label: string,
  componentName: ComponentsType,
  events?: any
  componentAttr?: any,
  formItemAttr?: any,
  slotName?: string,
}

