<template>
  <el-scrollbar v-if="hasSidebar" :class="{ sidebar: true, open }">
    <aside>
      <slot name="top" />
      <div class="sidebar-groups">
        <section
          v-for="(item, key) of sidebars"
          :key="key"
          class="sidebar-group"
        >
          <p class="sidebar-group__title">
            {{ item.text }}
          </p>
          <VPSidebarLink
            v-for="(child, childKey) in item.children"
            :key="childKey"
            :item="child"
            :active-link="activeLink"
            @close="$emit('close')"
            @click="onClickSidebarLink(child)"
          />
        </section>
      </div>
      <slot name="bottom" />
    </aside>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { useSidebar } from '~/composable/sidebar'

import VPSidebarLink from './sidebar/vp-sidebar-link.vue'
import { Ref, ref } from 'vue'
import { useRouter } from 'vitepress'
import { activeLink } from "~/components/share";

defineProps<{ open: boolean }>()
defineEmits(['close'])

// const isHome = useIsHome()
const { sidebars, hasSidebar } = useSidebar()

const onClickSidebarLink = (data: { link: string; text: string }) => {
  activeLink.value = data.link
}

const router = useRouter()
router.onAfterRouteChanged = (to) => {
  const toPathPart = to.split('/')
  toPathPart.shift()
  const activePathPart = activeLink.value?.split('/')
  if (activePathPart) {
    activePathPart.shift()
    const [targetCategory] = toPathPart
    const [currentCategory] = activePathPart
    if (targetCategory !== currentCategory) activeLink.value = undefined
  }
}
</script>
