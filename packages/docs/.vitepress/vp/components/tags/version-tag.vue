<template>
  <el-tag size="small" effect="plain" hit round class="ml-2">
    {{ version }}
  </el-tag>
</template>
<script lang="ts" setup>
defineProps<{
  version: string
}>()
</script>
