import { defineConfig } from "vite";

import type { Alias } from 'vite'
import path from 'path'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import {MarkdownTransform} from './.vitepress/plugins/markdown-transform'
import Prism from 'vite-plugin-prismjs'

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${ path.resolve(__dirname, './.vitepress/vp') }/`,
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
        dts: "./typings/components.d.ts",
        allowOverrides: true,
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [ElementPlusResolver()]
      }),
      AutoImport({
        dts: './typings/auto-import.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      MarkdownTransform(),
      Prism({
        css: true,
        languages: ['javascript','json','html','markup','typescript','markdown'],
        theme: 'funky'
      })
    ]
  }
})