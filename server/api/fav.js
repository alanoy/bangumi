const router = require('express').Router()
const { sites, items } = require('bangumi-data')

router.get('/fav', function (req, res, next) {
  let { ids } = req.query
  let list = []

  if (!ids) return res.json({ error: 'wrong params' })

  ids = ids.split(',')

  ids.forEach(favId => {
    items.some(item => {
      if (item.sites.length) {
        item.sites.some(site => {
          if (site.site === 'bangumi' && favId === site.id) {
            list.push(item)
          }
        })
      }
    })
  })

  res.json({
    code: 0,
    items: list,
    sites
  })
})

module.exports = router
