<template>
  <div :class="$attrs.class" class="px-[12px]">
    <a
      v-for="link in socialLinks"
      :key="link.link"
      :href="link.link"
      :title="link.title"
      target="_blank"
      rel="noreferrer noopener"
      class="social-link"
    >
      <i :class="link.icon" class="text-[24px] block" />
    </a>
  </div>
</template>
<script setup lang="ts">
import { socialLinks } from '~/const'
</script>
<style scoped lang="scss">
.social-link {
  color: var(--text-color);
}
</style>
