<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from "vitepress";

const props = defineProps<{
  href?: string
  noIcon?: boolean
}>()

const isExternal = computed(() => props.href && /^[a-z]+:/i.test(props.href))
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    class="link-item"
    :class="{ link: href }"
    :href="withBase(href ?? '')"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />

    <i v-if="isExternal && !noIcon" class="i-ri:external-link-line link-icon ml-1" />
  </component>
</template>

<style scoped>
.link-item {
  display: flex;
  align-items: center;
}

.el-icon {
  margin-left: 4px;
}
</style>
