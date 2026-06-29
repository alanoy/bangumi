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
  },

  devServer: { port },
  runtimeConfig: {
    app: {
      bgmtv: {
        appId: process.env.BGMTV_APP_ID,
        secret: process.env.BGMTV_APP_SECRET,
        redirectURI: process.env.BGMTV_REDIRECT_URI,
        userAgent: process.env.BGMTV_USERAGENT,
      },
      sessionSecret: process.env.NUXT_SESSION_SECRET,
    },
    public: {
      appTitle,
      isBgmtvAuthorize: process.env.BGMTV_AUTHORIZE === 'true',
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
