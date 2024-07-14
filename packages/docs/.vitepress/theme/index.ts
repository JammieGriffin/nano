// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import "virtual:uno.css"

import VPApp from "../vp";

export default {
  extends: DefaultTheme,
  Layout: VPApp,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
