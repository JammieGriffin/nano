import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import { ensureStartingSlash, isArray,removeExtension } from "~/utils"

type SidebarItem = {
  text: string
  link: string
}

type SidebarConfig = SidebarItem[]

type Sidebar =
  | {
  [ key: string ]: SidebarConfig
}
  | false
  | 'auto'

export const getSidebarConfig = (sidebar: Sidebar, path: string) => {
  if ( sidebar === false || isArray(sidebar) || sidebar === 'auto' ) return []
  // 确保路径以 "/" 开头
  path = ensureStartingSlash(path)

  for ( const dir in sidebar ) {
    if ( path.startsWith(ensureStartingSlash(dir)) )
      return sidebar[ dir ]
  }
  return []
}

export function isSideBarGroup(item) {
  return item.children !== undefined
}

export function getFlatSideBarLinks(sidebar) {
  return sidebar.reduce((links, item) => {
    if (item.link) {
      links.push({ text: item.text, link: removeExtension(item.link) })
    }
    if (isSideBarGroup(item)) {
      links = [...links, ...getFlatSideBarLinks(item.children)]
    }
    return links
  }, [])
}

export const useSidebar = () => {
  const route = useRoute()
  const { site, page } = useData()

  if ( !page.value ) {
    return {
      sidebars: computed(() => []),
      hasSidebar: computed(() => false)
    }
  }

  const sidebars = computed(() => {
    if ( page.value.frontmatter.sidebar === false ) return []
    return getSidebarConfig(site.value.themeConfig.sidebars, route.data.relativePath)
  })

  return {
    sidebars,
    hasSidebar: computed(() => sidebars.value.length > 0)
  }
}