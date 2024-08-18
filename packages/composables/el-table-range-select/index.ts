import {
  computed,
  ComputedRef,
  isRef,
  MaybeRef,
  onUnmounted,
  Ref,
  ref,
  watch,
} from 'vue'
import { watchOnce } from '@vueuse/core'

export type TableInstance = InstanceType<
  (typeof import('element-plus'))['ElTable']
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

interface EventRegistrationContext {
  modifier: MaybeRef<ModifierKey>
  isKeydown: Ref<boolean>
  isMousedown: Ref<boolean>
  start: Ref<number>
  current: Ref<number>
  cursor: MaybeRef<string>
  lazy: MaybeRef<number>
}

const noop = () => {}

const getModifierKey = (modifier: ModifierKey) => {
  switch (modifier) {
    case 'alt':
      return 'altKey'
    case 'shift':
      return 'shiftKey'
    case 'ctrl':
      return 'ctrlKey'
    default:
      return null
  }
}

const getRaw = <T>(maybeRef: Ref<T> | T) =>
  isRef(maybeRef) ? maybeRef.value : maybeRef

/**
 * 获取 rowIndex
 * 寻找距离入参 el 最近的 td 元素，找到 td 的父节点的 rowIndex 属性
 * @param el html 元素
 */
const getRowIndex = (el: HTMLElement): [number, boolean] => {
  const cell = el.closest('td')
  if (!cell) {
    return [-1, false]
  }
  const parentNode = cell.parentNode
  if (!parentNode || !Reflect.has(parentNode, 'rowIndex')) {
    return [-1, false]
  }
  const rowIndex = Reflect.get(parentNode, 'rowIndex') ?? -1
  return [rowIndex, true]
}
/**
 * 注册鼠标和键盘事件
 * @param el
 * @param context
 */
const registerEvents = (el: HTMLElement, context: EventRegistrationContext) => {
  const { modifier, isKeydown, isMousedown, start, current, lazy } = context
  let removeKeyboardEvent = noop
  const modifierKey = computed(() => getModifierKey(getRaw(modifier)))
  const handleKeyDown = (e: KeyboardEvent) => {
    isKeydown.value = Reflect.get(e, modifierKey.value!)
  }
  const handleKeyUp = () => {
    isKeydown.value = false
  }
  watch(
    () => modifierKey.value,
    (value) => {
      removeKeyboardEvent()
      if (value) {
        isKeydown.value = false
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        removeKeyboardEvent = () => {
          document.removeEventListener('keydown', handleKeyDown)
          document.removeEventListener('keyup', handleKeyUp)
        }
      } else {
        isKeydown.value = true
        removeKeyboardEvent = noop
      }
    }
  )

  const _lazy = computed(() => (isRef(lazy) ? lazy.value : lazy))
  const sleep = () =>
    _lazy.value > 0
      ? new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, _lazy.value)
        })
      : Promise.resolve()
  const handleMouseDown = async (e: MouseEvent) => {
    isMousedown.value = true
    await sleep()
    if (!isKeydown.value) return
    if (!isMousedown.value) return
    el.style.userSelect = 'none'
    const eventEl = e.target as HTMLElement
    const [rowIndex, hasRowIndex] = getRowIndex(eventEl)
    const _cursor = computed(() => getRaw(context.cursor))
    el.style.cursor = _cursor.value
    if (!hasRowIndex) {
      isMousedown.value = false
      return
    }
    start.value = rowIndex
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (!isKeydown.value || !isMousedown.value) return
    const eventEl = e.target as HTMLElement
    const [rowIndex, hasRowIndex] = getRowIndex(eventEl)
    if (!hasRowIndex) return
    current.value = rowIndex
  }
  const handleMouseUp = () => {
    el.style.userSelect = 'auto'
    el.style.cursor = 'auto'
    isMousedown.value = false
    start.value = -1
    current.value = -1
  }
  /**
   *
   */
  const handleMouseLeave = () => {
    el.style.cursor = 'default'
    isMousedown.value = false
    start.value = -1
    current.value = -1
  }
  el.addEventListener('mousedown', handleMouseDown)
  el.addEventListener('mousemove', handleMouseMove)
  el.addEventListener('mouseup', handleMouseUp)
  el.addEventListener('mouseleave', handleMouseLeave)
  return () => {
    removeKeyboardEvent()
    el.removeEventListener('mousedown', handleMouseDown)
    el.removeEventListener('mousemove', handleMouseMove)
    el.removeEventListener('mouseup', handleMouseUp)
    el.removeEventListener('mouseleave', handleMouseLeave)
  }
}
const useElTableRangeSelect = (
  tableRef: Ref<TableInstance>,
  options?: ElTableRangeSelectOptions
): UseElTableRangeSelectReturn => {
  /**
   * 键盘、鼠标状态
   */
  const _isKeydown = ref(true)
  const _isMousedown = ref(false)

  /**
   * 开始下标、当前下标、上一行下标
   */
  const _start = ref(-1)
  const _current = ref(-1)
  const _prev = ref(-1)

  const _isInverse = computed(
    () =>
      (_current.value >= _start.value && _prev.value > _current.value) ||
      (_current.value <= _start.value && _prev.value < _current.value)
  )
  /**
   * 状态变化回调
   */
  let _onCurrentChange: CurrentChangeCallback = noop
  let _onStart: StartChangeCallback = noop

  /**
   * 回调函数注册
   */
  const registerCurrentChangeCallback = (cb?: CurrentChangeCallback) => {
    if (cb) _onCurrentChange = cb
  }
  const registerStartChangeCallback = (cb?: StartChangeCallback) => {
    if (cb) _onStart = cb
  }
  const startWatch = () => {
    const stopWatchStart = watch(_start, (v) => {
      if (v === -1) return
      if (_isMousedown.value && _isKeydown.value) {
        _onStart(v)
      }
    })
    const stopWatchCurrent = watch(_current, (v, prev) => {
      if (v === -1 || prev === -1) return
      if (_isMousedown.value && _isKeydown.value) {
        _prev.value = prev
        _onCurrentChange(v, prev, _isInverse.value)
      }
    })
    return () => {
      stopWatchStart()
      stopWatchCurrent()
    }
  }

  let removeEvents: () => void
  let removeWatch: () => void
  /**
   * 监听一次 tableRef 变化，从 undefined -> 组件实例
   * 注册鼠标、键盘事件，开启状态监听
   */
  watchOnce<TableInstance>(tableRef, (v) => {
    const tableBody = v.$el.querySelector(
      '.el-table__body-wrapper'
    ) as HTMLElement | null
    if (!tableBody) throw new Error('No table body')
    removeEvents = registerEvents(tableBody, {
      // modifierKey: getModifierKey(options?.modifier),
      modifier: options?.modifier,
      isKeydown: _isKeydown,
      isMousedown: _isMousedown,
      start: _start,
      current: _current,
      cursor: options?.activeCursorStyle ?? 'cell',
      lazy: options?.lazy ?? 0,
    })
    removeWatch = startWatch()
  })
  onUnmounted(() => {
    removeEvents()
    removeWatch()
  })
  return {
    onCurrentChange: registerCurrentChangeCallback,
    onStart: registerStartChangeCallback,
    start: _start,
    current: _current,
    prev: _prev,
    active: computed(() => _isMousedown.value && _isKeydown.value),
  }
}
export default useElTableRangeSelect
