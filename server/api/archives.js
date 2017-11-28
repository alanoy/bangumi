const router = require('express').Router()
const { items } = require('bangumi-data')
const { getQuarterly } = require('./utils')

router.get('/archives', function (req, res, next) {
  let temp = {}
  let data = []

  items.forEach(item => {
    const id = item.id.split('_')
    const year = id[0]
    const month = parseInt(id[1])
    const quarterly = getQuarterly(month)

    if (!temp[year]) temp[year] = {}
    if (!temp[year][quarterly]) temp[year][quarterly] = 0

    temp[year][quarterly] += 1
  })

  for (let year in temp) {
    data.push({
      year,
      items: temp[year]
    })
  }

  data.reverse()

  res.json({
    code: 0,
    data
  })
})

module.exports = router
