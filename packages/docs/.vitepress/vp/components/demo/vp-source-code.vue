<script setup lang="ts">
import 'prismjs/themes/prism-funky.css'
import { computed } from 'vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})
</script>

<template>
  <div class="example-source-wrapper">
    <div class="example-source language-vue !bg-black !text-white" v-html="decoded" />
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
}
.example-source {
  padding: 16px;
  &:before {
    content: 'vue';
    position: absolute;
    top: 0.4em;
    right: 0.8em;
    opacity: 0.6;
    font-size: 0.8em;
  }
}
</style>
