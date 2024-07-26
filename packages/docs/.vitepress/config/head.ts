import { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
  [
    'script',
    {},
    `;(() => {
      const saved = localStorage.getItem('nano-theme-appearance')
      if (
        saved === 'auto'
          ? window.matchMedia(\`(prefers-color-scheme: dark)\`).matches
          : saved === 'dark'
      ) {
        document.documentElement.classList.add('dark')
      }
    })()
    `
  ],
  [
    'link',
    {
      rel: 'icon',
      href: '/images/nano.jpg',
      type: 'image/jpeg'
    }
  ]
]