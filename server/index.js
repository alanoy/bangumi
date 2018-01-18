const app = require('fastify')()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3100

app.register(require('./api'), { prefix: '/api' })

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
app.register(require('fastify-nuxt'), nuxtConfig)

app.ready()

// Listen the server
app.listen(port, host, (err) => {
  if (err) throw err
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
})
