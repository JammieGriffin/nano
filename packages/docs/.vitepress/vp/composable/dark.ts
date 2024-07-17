import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  storageKey: 'nano-theme-appearance',
})

export const toggleDark = useToggle(isDark)
