<template>
  <el-scrollbar ref="scrollbar" @scroll="onScroll">
    <div :style="wrapperStyle">
      <div
        v-for="(item,index) in currentRenderItems"
        :key="index"
      >
        <div
          ref="renderSlot"
          :style="getRenderSlotStyle(item)"
        >
          <slot name="item" :data="item.data"/>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script setup lang="ts" generic="T">
import { ElScrollbar } from 'element-plus'
import {
  computed,
  ComputedRef,
  CSSProperties, nextTick,
  onMounted, onUpdated,
  Ref,
  ref,
  watch
} from 'vue'
import { VirtualScrollItem } from "./virtual-scroll";


const props = withDefaults(defineProps<{
  direction?: 'vertical' | 'horizontal',
  items: T[],
  itemSize: number,
  poolSize?: number
}>(), {
  direction: 'vertical',
  poolSize: 50,
})

const renderSlot: Ref<HTMLDivElement[]> = ref()
const scrollbar = ref()

const renderItems: Ref<VirtualScrollItem<T>[]> = ref([])

watch(() => props.items.length, () => {
  renderItems.value = props.items.map((v, i) => {
    return {
      data: v,
      $width: props.itemSize,
      $height: props.itemSize,
      $index: i,
    }
  })
}, { immediate: true })

let cumulativeSize: number[] = []
const wrapperSize = computed(() => {
  const key = props.direction === 'vertical' ? '$height' : '$width'
  cumulativeSize = []
  return renderItems.value.reduce((totalSize, current) => {
    totalSize += Reflect.get(current, key)
    cumulativeSize.push(totalSize)
    return totalSize
  }, 0)
})

const currentRenderItems: Ref<VirtualScrollItem<T>[]> = ref([])

onMounted(() => {
  currentRenderItems.value = renderItems.value.slice(0, Math.min(props.poolSize, props.items.length))
})
onUpdated(() => {

})
const wrapperStyle: ComputedRef<CSSProperties> = computed(() => {
  const style: CSSProperties = {
    position: "relative",
  }
  if ( props.direction === 'vertical' ) Reflect.set(style, 'height', `${ wrapperSize.value }px`)
  else Reflect.set(style, 'width', `${ wrapperSize.value }px`)
  return style
})

const getRenderSlotStyle = (item: VirtualScrollItem<T>): CSSProperties => {
  if ( !item ) return {}
  const style: CSSProperties = {
    position: 'absolute',
  }
  if ( props.direction === 'vertical' ) {
    Reflect.set(style, 'top', `${ item.$index === 0 ? 0 : cumulativeSize[ item.$index - 1 ] }px`)
    Reflect.set(style, 'width', '100%')
  }
  else {
    Reflect.set(style, 'left', `${ item.$index === 0 ? 0 : cumulativeSize[ item.$index - 1 ] }px`)
    Reflect.set(style, 'height', '100%')

  }
  return style
}

const viewport = computed(() => {
  const el = scrollbar.value.$el as HTMLDivElement
  return {
    width: el.clientWidth,
    height: el.clientHeight
  }
})

const binarySearch = (array: number[], value: number) => {
  let start = 0
  let end = array.length - 1
  while ( start <= end ) {
    const mid = Math.floor(( start + end ) / 2)
    if ( array[ mid ] === value ) {
      return mid
    } else if ( array[ mid ] < value ) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return start

}

const onScroll = ({ scrollTop, scrollLeft }) => {
  const startIndex = binarySearch(cumulativeSize, props.direction === 'vertical' ? scrollTop : scrollLeft)
  currentRenderItems.value = renderItems.value.slice(startIndex, props.poolSize + startIndex)
  nextTick(() => {
    renderSlot.value && renderSlot.value.map((el, i) => {
      const item = currentRenderItems.value[ i ]
      if ( item ) {
        const { clientHeight, clientWidth } = el
        Object.assign(item, {
          $height: clientHeight,
          $width: clientWidth,
        })
      }
    })
  })
}
</script>