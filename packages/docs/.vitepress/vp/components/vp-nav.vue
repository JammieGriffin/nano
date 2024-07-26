<template>
  <header :class="{ navbar: true, 'has-sidebar': hasSidebar }">
    <VpNavbar :smaller-than-md="isSmallerThanMd" @toggle="toggleMdBreakpointState" />
    <VpNavMd />
  </header>
</template>
<script setup lang="ts">
import VpNavbar from '~/components/vp-navbar.vue'
import VpNavMd from '~/components/vp-nav-md.vue'
import { useSidebar } from '~/composable/sidebar'
import { useMd } from '~/composable/break-point'
import { useToggleWidgets } from '~/composable/toggle-wedgets'
import { isClient } from '@vueuse/core'
import { breakpoints } from '~/const'

const { hasSidebar } = useSidebar()
const { isSmallerThanMd, toggleMdBreakpointState } = useMd()

const close = () => toggleMdBreakpointState(false)

/**
 * 监听 resize 事件，根据 breakpoints.md 的值调整 isSmallerThanMd
 */
useToggleWidgets(isSmallerThanMd, () => {
  if (!isClient) return
  if (window.outerWidth >= breakpoints.md) {
    close()
  }
})
</script>
