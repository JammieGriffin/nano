import { UserConfig } from "vitepress";
import { nav } from "./config/nav";
import { sidebars } from "./config/sidebars";
import { mdPlugin } from "./config/plugins";
import { head } from "./config/head"
const buildTransformers = () => {
  const transformer = () => {
    return {
      props: [],
      needRuntime: true,
    }
  }

  const transformers = {}
  const directives = [
    'infinite-scroll',
    'loading',
    'popover',
    'click-outside',
    'repeat-click',
    'trap-focus',
    'mousewheel',
    'resize',
  ]
  directives.forEach((k) => {
    transformers[k] = transformer
  })

  return transformers
}

const config: UserConfig = {
  title: 'Nano',
  description: 'A VitePress Site',
  head,
  themeConfig: {
    nav,
    sidebars,
    logo: '/images/nano.jpg',

  },
  markdown: {
    config: (md) => mdPlugin(md),
    headers: {
      level: [2,3]
    }
  },
  vue: {
    ssr: true,
    template: {
      compilerOptions: {
        directiveTransforms: buildTransformers(),
      },
    },
  },
}
export default config
