<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { data as blogData } from '../../../meta/blog.data'

import { computed } from 'vue'
import { ensureStartingSlash, normalize } from '~/utils'

const { page } = useData()
const nextAndPrev = computed(() => {
  const currentIndex = blogData.findIndex(
    (item) => normalize(item.url) === normalize(ensureStartingSlash(page.value.relativePath))
  )
  const prev = currentIndex === 0 ? undefined : blogData.at(currentIndex - 1)
  const next = currentIndex + 1 === blogData.length ? undefined : blogData.at(currentIndex + 1)
  return {
    prev: prev && { link: prev.url, text: prev.frontmatter.title },
    next: next && { link: next.url, text: next.frontmatter.title },
    hasLinks: blogData.length > 0,
  }
})
</script>

<template>
  <div v-if="nextAndPrev.hasLinks" class="next-and-prev-link">
    <div class="container">
      <div class="prev">
        <a v-if="nextAndPrev.prev" class="link" :href="withBase(nextAndPrev.prev.link)">
          <i class="i-ep:arrow-left mr-1 text-[12px] text-[#303133]" />
          <span class="text">{{ nextAndPrev.prev.text }}</span>
        </a>
      </div>
      <div class="next">
        <a v-if="nextAndPrev.next" class="link" :href="withBase(nextAndPrev.next.link)">
          <span class="text">{{ nextAndPrev.next.text }}</span>
          <i class="i-ep:arrow-right ml-1 text-[12px] text-[#303133]" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.next-and-prev-link {
  padding-top: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.prev,
.next {
  display: flex;
  flex-shrink: 0;
  width: 50%;
}

.prev {
  justify-content: flex-start;
  padding-right: 12px;
}

.next {
  justify-content: flex-end;
  padding-left: 12px;
}

.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  max-width: 100%;
  height: 24px;
  font-size: 14px;
  font-weight: 500;
}

.text {
  display: inline-flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-icon {
  display: inline-flex;
  flex-shrink: 0;
  font-size: 12px;
  color: var(--text-color);
  transform: translateY(1px);
}

.icon-prev {
  margin-right: 8px;
}

.icon-next {
  margin-left: 8px;
}
</style>
