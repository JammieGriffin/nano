<script lang="ts" setup>
import { useData } from 'vitepress'
import VpPageNav from './doc-content/vp-page-nav.vue'
import VpPageToc from './doc-content/vp-page-toc.vue'

const { page } = useData()
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
      <VpPageNav />
    </div>
    <VpPageToc v-if="page.headers" />
  </div>
</template>
