<template>
  <div class="flex flex-col items-center">
    <h1>👋 你好~ 欢迎来到 Nano 的小站</h1>
    <p>这里会分享一些前端日常学习的总结以及代码，希望对你有所帮助~</p>
    <div class="w-full grid gap-4 grid-cols-1 lg:grid-cols-3 lg:px-16">
      <el-card class="w-full">
        <h3 class="m-0">近期文章</h3>
        <ul class="m-0 p-0">
          <li v-for="page in blogList" :key="page.url" class="pt-6 pb-4">
            <a
              :href="withBase(page.url)"
              class="text-[#606266] hover:text-[#409eff] w-full flex justify-between"
            >
              <div
                :class="{
                  'flex items-center': page.frontmatter.tags?.length > 0,
                }"
              >
                <p class="m-0">{{ page.frontmatter.title }}</p>
                <VersionTag
                  v-for="(tag, idx) in page.frontmatter.tags"
                  :key="idx"
                  :version="tag"
                />
              </div>
              <span class="text-sm text-[#606266]">{{
                  dayjs(page.frontmatter.date).format('YYYY-MM-DD')
                }}</span>
            </a>
          </li>
        </ul>
        <template #footer>
          <div class="flex justify-center">
            <VpLink :href="withBase('/blog/list')">查看更多</VpLink>
          </div>
        </template>
      </el-card>
      <el-card class="w-full">
        <h3 class="m-0">组件</h3>
        <ul class="m-0 p-0">
          <li v-for="page in componentList" :key="page.url" class="pt-6 pb-4">
            <a
              :href="withBase(page.url)"
              class="text-[#606266] hover:text-[#409eff] w-full flex justify-between"
            >
              <div
                :class="{
                  'flex items-center': page.frontmatter.tags?.length > 0,
                }"
              >
                <p class="m-0">{{ page.frontmatter.title }}</p>
                <VersionTag
                  v-for="(tag, idx) in page.frontmatter.tags"
                  :key="idx"
                  :version="tag"
                />
              </div>
              <span class="text-sm text-[#606266]">{{
                  dayjs(page.frontmatter.date).format('YYYY-MM-DD')
              }}</span>
            </a>
          </li>
        </ul>
        <template #footer>
          <div class="flex justify-center">
            <VpLink :href="withBase('/component/virtual-scroll')">查看更多</VpLink>
          </div>
        </template>
      </el-card>
      <el-card class="w-full">
        <h3 class="m-0">组合式函数</h3>
        <ul class="m-0 p-0">
          <li v-for="page in composableList" :key="page.url" class="pt-6 pb-4">
            <a
              :href="withBase(page.url)"
              class="text-[#606266] hover:text-[#409eff] w-full flex justify-between"
            >
              <div
                :class="{
                  'flex items-center': page.frontmatter.tags?.length > 0,
                }"
              >
                <p class="m-0">{{ page.frontmatter.title }}</p>
                <VersionTag
                  v-for="(tag, idx) in page.frontmatter.tags"
                  :key="idx"
                  :version="tag"
                />
              </div>
              <span class="text-sm text-[#606266]">{{
                  dayjs(page.frontmatter.date).format('YYYY-MM-DD')
              }}</span>
            </a>
          </li>
        </ul>
        <template #footer>
          <div class="flex justify-center">
            <VpLink :href="withBase('/composable/table-range-select')">查看更多</VpLink>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { data as blogData } from '../../../meta/blog.data'
import { data as componentData } from '../../../meta/component.data'
import { data as composableData } from '../../../meta/composable.data'
import { dayjs } from "element-plus";
import { withBase } from "vitepress";

const blogList = blogData
  .sort((a, b) => {
    return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  })
  .slice(0, 5)

const componentList = componentData
  .sort((a, b) => {
    return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  })
  .slice(0, 5)

const composableList = composableData
  .sort((a, b) => {
    return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  })
  .slice(0, 5)

</script>
<style scoped>
h3 {
  color: #606266;
}
</style>
