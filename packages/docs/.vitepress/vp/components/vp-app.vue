<template>
  <div class="App">
    <VpOverlay class="overlay" :show="isMobileSidebarOpen" @click="toggleMobileSidebar(false)" />
    <VpNav />
    <VpSubNav v-if="hasSidebar" :is-sidebar-open="isMobileSidebarOpen" @open-menu="toggleMobileSidebar(true)" />
    <VpSidebar :open="isMobileSidebarOpen" @close="toggleMobileSidebar(false)" />
    <VpContent :is-sidebar-open="isMobileSidebarOpen">
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-mid>
        <slot name="aside-mid" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </VpContent>
  </div>
</template>
<script setup lang="ts">
import VpOverlay from '~/components/vp-overlay.vue'
import VpNav from './vp-nav.vue'
import VpSidebar from '~/components/vp-sidebar.vue'
import VpContent from '~/components/vp-content.vue'
import VpSubNav from '~/components/vp-subnav.vue'
import { isClient, useEventListener, useToggle } from '@vueuse/core'
import { useSidebar } from '~/composable/sidebar'
import { useToggleWidgets } from '~/composable/toggle-wedgets'
import { breakpoints } from '~/const'
import { onMounted } from 'vue'

const [isMobileSidebarOpen, toggleMobileSidebar] = useToggle(false)

const { hasSidebar } = useSidebar()
useToggleWidgets(hasSidebar, () => {
  if (!isClient) return
  if (window.outerWidth >= breakpoints.lg) {
    toggleMobileSidebar(false)
  }
})

useEventListener('keydown', (e) => {
  if (!isClient) return
  if (e.key === 'Escape' && isMobileSidebarOpen.value) {
    toggleMobileSidebar(false)
    document.querySelector<HTMLButtonElement>('.sidebar-button')?.focus()
  }
})

onMounted(() => {
  if (!isClient) return
  window.addEventListener(
    'click',
    (e) => {
      const link = (e.target as HTMLElement).closest('a')
      if (!link) return

      const { protocol, hostname, pathname, target } = link
      const currentUrl = window.location
      const extMatch = pathname.match(/\.\w+$/)
      // only intercept inbound links
      if (
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        target !== `_blank` &&
        protocol === currentUrl.protocol &&
        hostname === currentUrl.hostname &&
        !(extMatch && extMatch[0] !== '.html')
      ) {
        e.preventDefault()
        if (pathname !== currentUrl.pathname) {
          // nprogress.start()
        }
      }
    },
    { capture: true }
  )
})
</script>
