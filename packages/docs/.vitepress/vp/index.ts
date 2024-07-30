// @ts-ignore
import VPApp from '~/components/vp-app.vue'

import 'virtual:uno.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/css-vars.scss'
import './styles/app.scss'

export default VPApp

import type { Component } from 'vue'

// @ts-ignore
import ApiTyping from './components/globals/vp-api-typing.vue'
// @ts-ignore
import ApiFunctionType from './components/globals/vp-api-function.vue'
// @ts-ignore
import ApiBooleanType from './components/globals/vp-api-bool.vue'
// @ts-ignore
import ApiStringType from './components/globals/vp-api-string.vue'
// @ts-ignore
import ApiNumberType from './components/globals/vp-api-number.vue'
// @ts-ignore
import ApiRefType from './components/globals/vp-api-ref.vue'
// @ts-ignore
import ApiEnumType from './components/globals/vp-api-enum.vue'
// @ts-ignore
import ApiExternalType from './components/globals/vp-api-external.vue'
// @ts-ignore
import VpDemo from './components/vp-demo.vue'
// @ts-ignore
import Home from './components/globals/home.vue'

// @ts-ignore
import VpSourceCode from "~/components/demo/vp-source-code.vue";
// @ts-ignore
import VpBlogList from "~/components/globals/vp-blog-list.vue";
export const globals: [string, Component][] = [
  ['Home', Home],
  ['Demo', VpDemo],
  ['ApiTyping', ApiTyping],
  ['FunctionType', ApiFunctionType],
  ['EnumType', ApiEnumType],
  ['BooleanType', ApiBooleanType],
  ['StringType', ApiStringType],
  ['NumberType', ApiNumberType],
  ['RefType', ApiRefType],
  ['ExternalType', ApiExternalType],
  ['SourceCode',VpSourceCode],
  ['BlogList', VpBlogList]
]
