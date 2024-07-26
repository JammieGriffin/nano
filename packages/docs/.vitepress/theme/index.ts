// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import "virtual:uno.css"

import VPApp, { globals } from "../vp";

export default {
  extends: DefaultTheme,
  Layout: VPApp,
  enhanceApp({ app }) {
    // ...
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  }
} satisfies Theme
