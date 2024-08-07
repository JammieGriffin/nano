<script setup lang="ts">
import 'prismjs/themes/prism-funky.css'
import { computed } from 'vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: false,
    default: 'vue',
  },
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})
</script>

<template>
  <div class="example-source-wrapper relative">
    <span class="language__tag z-[9]">{{lang}}</span>

    <div
      class="example-source !bg-black !text-white"
      :class="`language-${lang} z-[8]`"
      v-html="decoded"
    />
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
}
.language__tag {
  position: absolute;
  top: 0.4em;
  right: 0.8em;
  opacity: 0.8;
  font-size: 0.8em;
}
.example-source {
  padding: 16px;
}
</style>
