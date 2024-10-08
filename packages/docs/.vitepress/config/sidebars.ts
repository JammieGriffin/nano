import blogRouteConfig from '../router/blog.json'
import componentRouteConfig from '../router/component.json'
import composableRouteConfig from '../router/composable.json'
import {ensureStartingSlash} from "../vp/utils";

function getBlogSidebar() {
  return Object.entries(blogRouteConfig).map(([prefix, item]) => mapPrefix(item, prefix))
}

function getComponentSidebar() {
  return Object.entries(componentRouteConfig).map(([prefix, item]) => mapPrefix(item, prefix))
}

function getComposableSidebar() {
  return Object.entries(composableRouteConfig).map(([prefix, item]) => mapPrefix(item, prefix))
}

// return sidebar with language configs.
// this might create duplicated data but the overhead is ignorable
const getSidebars = () => {
  return {
    '/blog/': getBlogSidebar(),
    '/component/': getComponentSidebar(),
    '/composable': getComposableSidebar()
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
