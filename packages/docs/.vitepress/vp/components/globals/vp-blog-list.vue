<template>
  <div class="max-w-[720px]">
    <ul class="m-0 p-0">
      <li v-for="page in blogList" :key="page.url" class="pt-6 pb-4">
        <a :href="page.url" class="text-[#606266] hover:text-[#409eff] w-full flex justify-between">
          <div :class="{ 'flex items-center': page.frontmatter.tags?.length > 0 }">
            <h2 class="m-0">{{ page.frontmatter.title }}</h2>
            <VersionTag v-for="(tag, idx) in page.frontmatter.tags" :key="idx" :version="tag" />
          </div>
          <span class="text-sm text-[#606266]">{{ dayjs(page.frontmatter.date).format('YYYY-MM-DD') }}</span>
        </a>
      </li>
    </ul>
    <VpPagePagination v-model="pageIndex" :page-size="PAGE_SIZE" :total="pageTotalCount" />
  </div>
</template>
<script setup lang="ts">
import VpPagePagination from '../doc-content/vp-page-pagination.vue'
import { data as blogData } from '../../../meta/blog.data'
import { computed, ref, Ref } from 'vue'
import { useBrowserLocation } from '@vueuse/core'
import { dayjs } from "element-plus";

const PAGE_SIZE = 20
const location = useBrowserLocation()
const blogListRaw = computed(() => {
  const filterTag = new URLSearchParams(location.value.search).get('tag')
  return blogData.filter((page) =>
    filterTag ? page.frontmatter.tags && page.frontmatter.tags.includes(filterTag) : true
  )
})
const pageIndex: Ref<number> = ref(1)
const pageTotalCount = computed(() => blogListRaw.value.length)
const blogList = computed(() => {
  const start = (pageIndex.value - 1) * PAGE_SIZE
  return blogListRaw.value.slice(start, start + PAGE_SIZE)
})
</script>
