import blogRouteConfig from '../router/blog.json'
import componentRouteConfig from '../router/component.json'
import composableRouteConfig from '../router/composable.json'
import {ensureStartingSlash} from "../vp/utils";

function getBlogSidebar() {
  return Object.entries(blogRouteConfig).map(([prefix, item]) => mapPrefix(item, prefix))
}

// function getComponentsSideBar() {
//   return Object.fromEntries(
//     Object.entries(componentLocale).map(([lang, val]) => [
//       lang,
//       Object.values(val).map((item) => mapPrefix(item, lang, '/component')),
//     ])
//   )
// }

// return sidebar with language configs.
// this might create duplicated data but the overhead is ignorable
const getSidebars = () => {
  return {
    '/blog/': getBlogSidebar(),
    // '/component/': getComponentsSideBar(),
  }
}

type Item = {
  text: string
  children?: Item[]
  link?: string
}

function mapPrefix(item: Item, prefix = '') {
  if (item.children && item.children.length > 0) {
    return {
      ...item,
      children: item.children.map((child) => mapPrefix(child, prefix)),
    }
  }
  return {
    ...item,
    link: ensureStartingSlash(`${prefix}${item.link}`),
  }
}

export const sidebars = getSidebars()
