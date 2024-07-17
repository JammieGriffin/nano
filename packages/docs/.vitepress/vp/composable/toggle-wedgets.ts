import { watch } from 'vue'

import { isClient } from '@vueuse/core'
import type { Ref } from 'vue'

/**
 * 监听一个布尔值，当布尔值为 true 时，添加 resize 事件处理
 * 当布尔值为 false 时，删除 resize 事件处理
 */
export const useToggleWidgets = (
  watchSource: Ref<boolean>,
  handler: (e: Event) => void
) => {
  if (!isClient) return

  watch(
    () => watchSource.value,
    (val) => {
      if (val) {
        window.addEventListener('resize', handler)
      } else {
        window.removeEventListener('resize', handler)
      }
    }
  )
}
