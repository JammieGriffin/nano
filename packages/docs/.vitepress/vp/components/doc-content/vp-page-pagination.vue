<template>
  <div v-if="total > pageSize" class="next-and-prev-link">
    <div class="container">
      <div class="prev">
        <div v-if="pageIndex > 1" class="link" @click="pageIndex--">
          <i class="i-ep:arrow-left mr-1 text-[12px]" />
          <span class="text">上一页</span>
        </div>
      </div>
      <div class="next">
        <div v-if="pageIndex * pageSize < total" class="link" @click="pageIndex++">
          <span class="text">下一页</span>
          <i class="i-ep:arrow-right ml-1 text-[12px]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  total: number
  pageSize: number
}>()
const pageIndex = defineModel<number>()
</script>
<style scoped>
.next-and-prev-link {
  padding-top: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.prev,
.next {
  display: flex;
  flex-shrink: 0;
  width: 50%;
}

.prev {
  justify-content: flex-start;
  padding-right: 12px;
}

.next {
  justify-content: flex-end;
  padding-left: 12px;
}

.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  max-width: 100%;
  height: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.text {
  display: inline-flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--brand-color);
}

.el-icon {
  display: inline-flex;
  flex-shrink: 0;
  font-size: 12px;
  color: var(--text-color);
  transform: translateY(1px);
}

.icon-prev {
  margin-right: 8px;
}

.icon-next {
  margin-left: 8px;
}
</style>
