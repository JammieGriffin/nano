<script lang="ts" setup>
import VPLink from '../common/vp-link.vue'

import type { Link } from '../../types'
import { withBase } from "vitepress";

defineProps<{
  item: Link
}>()
</script>

<template>
  <VPLink
    :class="{
      'is-menu-link': true,
    }"
    :href="withBase(item.link)"
    :no-icon="true"
  >
    {{ item.text }}
  </VPLink>
</template>

<style scoped lang="scss">
.is-menu-link {
  display: block;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  color: var(--text-color);
  transition: color var(--el-transition-duration);

  &.active {
    border-bottom: 2px solid var(--brand-color);
  }

  &:hover {
    color: var(--brand-color);
  }
}
</style>
