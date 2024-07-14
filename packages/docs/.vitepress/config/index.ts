import { nav } from './nav'
import { UserConfig } from "vitepress";

const config: UserConfig = {
  title: "Nano",
  description: "A VitePress Site",
  themeConfig: {
    nav,

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: '' }
    ]
  }
}
export default config
