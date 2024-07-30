import { ContentData, createContentLoader, defineLoader } from "vitepress";
import { normalize } from "../vp/utils";

declare const data: ContentData[]
export {data}
export default defineLoader(createContentLoader('/blog/**/*.md',{
  transform:(rawData) => {
    return rawData.filter((page) => {
      return !normalize(page.url).endsWith('list')
    })
  }
}))