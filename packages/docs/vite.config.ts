import { defineConfig } from "vite";

import type { Alias } from 'vite'
import path from 'path'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${ path.resolve(__dirname, './.vitepress/vitepress') }/`,
  },
]
export default defineConfig(() => {
  return {
    resolve: {
      alias
    },
    plugins: [
      UnoCSS(),
      Components({
        dirs: ['.vitepress/vp/components'],
        allowOverrides: true,
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
    ]
  }
})