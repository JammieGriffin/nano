<script setup lang="ts">
import { isDark } from '~/composable/dark'
import CommonThemeToggle from '../common/vp-theme-toggle.vue'
</script>

<template>
  <div class="theme-toggle-content">
    <CommonThemeToggle aria-label="切换主题" :aria-checked="isDark" />
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as *;

.theme-toggle-content {
  @include with-bg;
  background-color: transparent;
  display: none;
  border-radius: 50%;
  height: 24px;
  padding: 0 12px;

  @include respond-to('md') {
    display: flex;
    align-items: center;
  }
}
</style>
