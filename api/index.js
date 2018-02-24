module.exports = (fastify, options, next) => {
  const dataHandler = require('./data')
  fastify.get('/data', async (req, reply) => {
    return dataHandler(req)
  })

  const archivesHandler = require('./archives')
  fastify.get('/archive', async (req, reply) => {
    return archivesHandler(req)
  })

  const favHandler = require('./fav')
  fastify.get('/fav', async (req, reply) => {
    return favHandler(req)
  })

  next()
}
