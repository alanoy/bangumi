const { siteMeta, items } = require('bangumi-data')

module.exports = (req) => {
  let { ids } = req.query
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

  return {
    code: 0,
    items: list,
    sites: siteMeta
  }
}
