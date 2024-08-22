<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { withBase } from "vitepress";

const goHome = () => {
  if (!isClient) return
  window.location.href = withBase('/')
}
</script>

<template>
  <el-result icon="error" title="资源未找到" sub-title="请求的页面不存在">
    <template #extra>
      <el-button @click="goHome">返回主页</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.el-result {
  height: 100vh;
  width: 100vw;
}
</style>
