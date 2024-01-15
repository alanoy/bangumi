// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

// ========== custom config ==========
const appTitle = 'Bangumi'

// will be displayed in navbar, such as github, twitter, etc.
const socialMediaList: NavbarMenu[] = []

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

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'fantasy', // default theme
    dataValue: 'theme',
    classSuffix: '',
  },

  devServer: { port },
  runtimeConfig: {
    public: {
      appTitle,
      socialMediaList,
    },
  },

  routeRules: {},
})
