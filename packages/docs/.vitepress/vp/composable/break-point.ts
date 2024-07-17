import { useToggle } from '@vueuse/core'
export const useMd = () => {
  const [isSmallerThanMd, toggleMdBreakpointState] = useToggle()
  return {
    isSmallerThanMd,
    toggleMdBreakpointState,
  }
}
