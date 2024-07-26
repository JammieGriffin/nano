<template>
  <nav v-if="navs" class="navbar-menu">
    <VpMenuLink v-for="(item, key) in navs" :key="key" :item="item" />
  </nav>
</template>
<script setup lang="ts">
import VpMenuLink from '~/components/navbar/vp-menu-link.vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()
const navs = computed(() => {
  return theme.value.nav
})
</script>
