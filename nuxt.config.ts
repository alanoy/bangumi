import path from 'path'
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

// ========== custom config ==========
const appTitle = 'Bangumi'

// dev server port
const port = 3000

// ========== custom config end =========

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  alias: {
    '@': path.resolve(__dirname, './'),
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '番组, bangumi, 动漫',
        },
      ],
      script: [],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
  },

  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode', '@nuxt/image'],

  colorMode: {
    preference: 'fantasy', // default theme
    dataValue: 'theme',
    classSuffix: '',
  },

  i18n: {
    vueI18n: path.resolve('./i18n.config.ts'),
    locales: ['zh-cn', 'en'],
    defaultLocale: 'zh-cn',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    // i18n v9 默认开启,官方建议显式关闭(会有问题且 v10 移除)。项目用 $t/t,不用 v-t 指令,关闭无影响。
    bundle: { optimizeTranslationDirective: false },
  },

  devServer: { port },
  runtimeConfig: {
    // 服务端私密(根级 runtimeConfig 不暴露给浏览器)。
    // 注意:`app` 是 Nuxt 保留命名空间,会自动暴露给客户端 —— 之前把 secret 放在
    // runtimeConfig.app 下,导致 sessionSecret / bgm.tv secret 泄露进 client bundle。
    bgmtv: {
      secret: process.env.BGMTV_APP_SECRET,
      userAgent: process.env.BGMTV_USERAGENT,
    },
    sessionSecret: process.env.NUXT_SESSION_SECRET,
    public: {
      appTitle,
      isBgmtvAuthorize: process.env.BGMTV_AUTHORIZE === 'true',
      // appId / redirectURI 是公开 OAuth 参数(本就出现在浏览器地址栏),
      // authorize 中间件在客户端导航时需要,故放 public。
      bgmtv: {
        appId: process.env.BGMTV_APP_ID,
        redirectURI: process.env.BGMTV_REDIRECT_URI,
      },
    },
  },

  routeRules: {
    // Public, session-independent GET routes backed by (slow) bgm.tv calls.
    // Cache 1 day so repeat visits are instant and the serverless function rarely
    // re-runs the bgm.tv work. First visit per route still computes cold.
    // NOT cached: /api/ranking (POST), /api/subject + /api/collections (session-scoped).
    '/api/calendar': { swr: 60 * 60 * 24 },
    '/api/archive/**': { swr: 60 * 60 * 24 },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: '2025-05-20',
})
