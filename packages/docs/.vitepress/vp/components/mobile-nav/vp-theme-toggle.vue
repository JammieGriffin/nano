<script setup lang="ts">
import CommonThemeToggle from '../common/vp-theme-toggle.vue'
import { isDark } from '~/composable/dark'

</script>

<template>
  <div class="full-screen-theme-toggle">
    <span>主题</span>
    <CommonThemeToggle
      aria-label="切换主题"
      :aria-checked="isDark"
    />
  </div>
</template>

<style lang="scss" scoped>
.full-screen-theme-toggle {
  display: flex;
  padding: 12px 14px;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 13px;
  background-color: var(--bg-color-soft);
  border-radius: 8px;
}
</style>
