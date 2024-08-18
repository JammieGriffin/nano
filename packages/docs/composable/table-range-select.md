---
title: useElTableRangeSelect
date: 2024-8-17
---

# useElTableRangeSelect

适用于 `el-table` 的鼠标拖动多行选择

## 基本用法

将 `el-table` 的实例 `tableRef` 输入 `useElTableRangeSelect`
。方法内部会根据配置为 `el-table` 添加鼠标和键盘事件监听器。

鼠标左键按住并在表格范围内拖动即可选择或取消选择表格行

`onStart` 回调会在激活表格多行选择时触发，参数是当时鼠标所在的行下标 `rowIndex`。

`onChange` 回调会在激活表格多行选择后，鼠标移动经过非 **初始行** 时触发，有三个参数：

- `currentIndex`: 当前鼠标所在的 `rowIndex`。

- `prevIndex`: 鼠标上一次经过的 `rowIndex`。

- `isInverse`: 是否为反方向移动。当激活多行选择事件后，如果鼠标向下移动，则鼠标向下移动为
  **正方向移动**，鼠标向上移动为 **反方向移动**；反之，如果激活多行选择事件后，鼠标向上移动，则则鼠标向上移动为
  **正方向移动**，鼠标向下移动为 **反方向移动**。

通过 `tableRef.value.toggleRowSelection(tableData.value[index])`
切换表格行的选择状态，与 `onStart` 和 `onChange` 回调配合实现表格的多行选择。

:::demo
table-range-select/basic
:::

## 与表格自带 checkbox 一起使用

因为表格行选择状态的改变是通过 `tableRef.value.toggleRowSelection`
方法去实现的，在使用 `el-table` 自带的多选功能时， `checkbox`
的点击事件和 `onStart`
回调中都调用了 `toggleRowSelection` 方法，导致状态不变。

因此需要在 `useElTableRangeSelect` 中设置 `lazy` 参数，单位为毫秒，且值大于 `100`
。通过延迟触发多行选择事件以兼容 `el-table` 自带的 `checkbox` 点击事件。

:::demo
table-range-select/with-checkbox
:::

## 添加激活多选的修饰按键

表格多行选择事件触发时会将 `user-select` 属性禁用，如果需要保留表格的文本选择功能，可以设置 `options.modifier`，使用按键修饰 + 鼠标长按触发表格多行选择事件。

支持的修饰按键：`alt`、`shift`、`ctrl`

:::demo
table-range-select/with-modifier-key
:::

## 修改鼠标样式

激活表格多行选择时，鼠标的默认样式为 `cell`.

通过 `options.activeCursorStyle` 设置激活表格多行选择时的鼠标样式。

:::demo
table-range-select/cursor-style
:::

## 类型声明

```typescript

const useElTableRangeSelect = (ref: Ref<TableInstance>, options?: ElTableRangeSelectOptions) => UseElTableRangeSelectReturn

export type TableInstance = InstanceType<
  ( typeof import('element-plus') )['ElTable']
>

export type StartChangeCallback = (value: number) => void

export type CurrentChangeCallback = (
  value: number,
  prev: number,
  isInverse: boolean
) => void

export type ModifierKey = 'alt' | 'ctrl' | 'shift' | '' | undefined

/**
 * 拖拽选择配置项
 */
export interface ElTableRangeSelectOptions {
  /**
   * 按下哪个按键 + 按住鼠标左键开启拖拽选择
   * 不设置则直接按下鼠标左键开启拖拽选择
   */
  modifier?: MaybeRef<ModifierKey>
  /**
   * 激活拖动选择时的鼠标样式，参考 tailwindcss 的 cursor
   * 默认：cell
   */
  activeCursorStyle?: MaybeRef<string>
  /**
   * onmousedown 事件触发后延迟多少 ms 开始处理拖动选择
   * 用于解决 option.modifier 为 undefined 时，在 onStart 回调中调用了 tableRef.toggleRowSelection 时
   * 与 <el-table-column type="selection"> 自带的 checkbox 点击事件冲突
   * 延迟不要低于 100 ms，否则依旧会出现冲突
   *
   * 当 option.modifier 为 'alt' | 'ctrl' | 'shift' 时，可以不设置此项
   */
  lazy?: MaybeRef<number>
}

export type UseElTableRangeSelectReturn = {
  onCurrentChange: (cb?: CurrentChangeCallback) => void
  onStart: (cb?: StartChangeCallback) => void
  start: Ref<number>
  current: Ref<number>
  prev: Ref<number>
  active: ComputedRef<boolean>
}
```