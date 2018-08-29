module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '番组放送',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '番组放送, bangumi, bgm, 动漫' }
    ],
    script: [
      { src: 'https://use.fontawesome.com/f722fe8ff4.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#e74c3c' },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],

  cache: {
    max: 1000,
    maxAge: 604800000
  },

  env: {
    baseUrl: '/'
  },

  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios']
  },

  serverMiddleware: [
    { path: '/api/data', handler: '~/api/data.js' },
    { path: '/api/archives', handler: '~/api/archives.js' },
    { path: '/api/fav', handler: '~/api/fav.js' }
  ]
}
