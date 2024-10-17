// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

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
          hid: 'description',
          name: 'description',
          content: '番组, bangumi, 动漫',
        },
      ],
      script: [],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
  },

  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/image'],

  colorMode: {
    preference: 'fantasy', // default theme
    dataValue: 'theme',
    classSuffix: '',
  },

  i18n: {
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
    // '/item/*': { swr: true },
  },
})

