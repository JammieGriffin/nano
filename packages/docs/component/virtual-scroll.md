---
title: 虚拟滚动
date: 2024-8-3
---

# 虚拟滚动

基于 `el-scrollbar` 实现的虚拟滚动。

## 基本用法

设置属性 `items` 为列表数据，设置 `item-size` 为列表项的默认宽度或高度，在 `item`
插槽中定义列表项的显示内容和样式。

:::demo
virtual-scroll/base
:::

## 横向滚动

当属性 `direction` 为 `horizontal` 时，`item-size` 为列表项的默认宽度，列表项横向排布。

:::demo
virtual-scroll/horizontal
:::

## 非等高列表项

在 `item` 插槽中定义列表项的样式，组件内部会自动计算整个列表的高度或宽度。

:::demo
virtual-scroll/random-height
:::

## 手动滚动

通过使用 `scrollTo` 和 `scrollToIndex` 方法可以手动控制滚动条滚动。

:::demo
virtual-scroll/custom-scroll
:::

## API

### Props

| 属性名                   | 描述          | 类型                                  | 默认值      |
|-----------------------|-------------|-------------------------------------|----------|
| items ^(required)     | 列表数据        | ^[Array<T>]                         | —        |
| item-size ^(required) | 列表项的默认宽度或高度 | ^[number]                           | —        |
| direction             | 虚拟滚动方向      | ^[enum]`'vertical' \| 'horizontal'` | vertical |
| pool-size             | 列表项的数量      | ^[number]                           | 50       |

### Slots

| 名称    | 说明                | slotProps              |
|-------|-------------------|------------------------|
| empty | `items` 为空数组显示的内容 |                        |
| item  | 列表项               | ^[Object]`{ data: T }` |

### Exposes

| 名称            | 说明          | 类型                                   |
|---------------|-------------|--------------------------------------|
| scrollTo      | 滚动到指定高度或宽度  | ^[Function]`(to: number) => void`    |
| scrollToIndex | 滚动到指定下标的列表项 | ^[Function]`(index: number) => void` |

