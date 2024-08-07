<script lang="ts" setup>
import { useData, useRoute } from 'vitepress'
import VpPageNav from './doc-content/vp-page-nav.vue'
import VpPageToc from './doc-content/vp-page-toc.vue'
import VpBlogNav from './doc-content/vp-blog-nav.vue'
import { watch } from 'vue'
import { useToggle } from '@vueuse/core'

const { page } = useData()
const route = useRoute()
const [isBlogList, toggleIsBlogList] = useToggle(false)
const [isBlogContent, toggleIsBlogContent] = useToggle(false)
watch(
  () => route.path,
  (path) => {
    toggleIsBlogList(path.includes('/blog/list'))
    toggleIsBlogContent(path.startsWith('/blog'))
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
      <VpPageNav v-if="!isBlogList && !isBlogContent" />
      <VpBlogNav v-else-if="!isBlogList&&isBlogContent" />
    </div>
    <VpPageToc v-if="page.headers && !isBlogList" />
  </div>
</template>
