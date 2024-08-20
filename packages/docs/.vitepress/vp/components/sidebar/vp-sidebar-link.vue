<template>
  <a
    ref="sidebarItem"
    :class="{
      link: true,
      active: activeLink,
      'flex items-center': item.promotion,
    }"
    :href="withBase(item.link)"
    @click="$emit('close')"
  >
    <p class="link-text">{{ item.text }}</p>
    <VersionTag v-if="item.promotion" class="ml-2" :version="item.promotion" />
  </a>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { isActive, normalize } from '~/utils'

import type { Link } from '~/types'
import VersionTag from '~/components/tags/version-tag.vue'

const props = defineProps<{
  item: Link
  activeLink?: string
}>()

defineEmits(['close'])

const sidebarItem = ref<HTMLElement>()

const route = useRoute()

const activeLink = computed<boolean>(() => {
  if (!props.activeLink) return normalize(route.path) === withBase(props.item.link)
  return props.activeLink === withBase(props.item.link)


  // const isBlogRoute = normalize(route.data.relativePath).startsWith('blog')
  //
  // if (!isBlogRoute) {
  //   return isActive(route, props.item.link)
  // }
  // const queryString = props.item.link.split('?')[1]
  // let search = ''
  // if ( isClient ) {
  //   search = window.location.search
  // }
  // if (!queryString && !search) {
  //   return normalize(route.path) === props.item.link
  // }
  // const params = new URLSearchParams(queryString)
  // const tag = params.get('tag')
  // return search.includes(`tag=${tag}`)
})

watch([activeLink, sidebarItem], ([active, el]) => {
  if (active && el) {
    el.scrollIntoView?.({ block: 'nearest' })
  }
})
</script>
<style scoped lang="scss">
.link:not(.flex) {
  display: block;
}

.link {
  padding: 10px 16px;
  line-height: 1.5;
  font-size: 0.9rem;
  border-radius: 8px;

  .link-text {
    margin: 0;
  }
}

.link:hover .link-text {
  color: var(--brand-color);
  transition: color 0.25s;
}

.link.active {
  background-color: var(--link-active-bg-color);

  .link-text {
    font-weight: 600;
    color: var(--brand-color);
    transition: color 0.25s;
  }
}

.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-light);
  transition: color 0.5s;
}
</style>
