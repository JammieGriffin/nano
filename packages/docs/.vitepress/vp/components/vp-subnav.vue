<script setup lang="ts">
import { useSidebar } from '~/composable/sidebar'
import { useBackTop } from '~/composable/back-top'
import ToggleSidebarBtn from './subnav/toggle-sidebar-btn.vue'

defineProps<{
  isSidebarOpen: boolean
}>()
defineEmits(['open-menu'])

const { hasSidebar } = useSidebar()
const { shouldShow, scrollToTop } = useBackTop()
</script>

<template>
  <div class="sub-nav py-3 flex items-center">
    <ToggleSidebarBtn
      v-if="hasSidebar"
      :aria-expanded="isSidebarOpen"
      @click="$emit('open-menu')"
    />
    <Transition name="shifting">
      <ElButton
        :class="{ 'go-back-top': true, show: shouldShow }"
        link
        class="height-5"
        @click.prevent.stop="scrollToTop"
      >
        回到顶部
      </ElButton>
    </Transition>
  </div>
</template>
