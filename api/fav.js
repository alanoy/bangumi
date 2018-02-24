const { siteMeta, items } = require('bangumi-data')
const url = require('url')

module.exports = (req, res) => {
  let { ids } = url.parse(req.url, true).query
  let list = []

  if (!ids) return { error: 'wrong params' }

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

  res.end(JSON.stringify({
    code: 0,
    items: list,
    sites: siteMeta
  }))
}
