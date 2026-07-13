import type { ModuleOptions as ColorModeModuleOptions } from '@nuxtjs/color-mode'

// colorMode 配置键的模块增强。
// @nuxtjs/color-mode v4 没有手写 declare module '@nuxt/schema' (不像 i18n),
// 它依赖 Nuxt 生成的 .nuxt/types/modules.d.ts —— 该文件只被 node 上下文引用,
// 根 tsconfig (扁平配置) 看不到, 于是 defineNuxtConfig({ colorMode }) 报 TS2353。
// 这里补一个项目级增强, 类型与生成的一致, 供 app/server/根 上下文使用。
declare module '@nuxt/schema' {
  interface NuxtConfig {
    colorMode?: false | Partial<ColorModeModuleOptions>
  }
}
