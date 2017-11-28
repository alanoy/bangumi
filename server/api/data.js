const router = require('express').Router()
const { sites, items } = require('bangumi-data')
const {
  filterSearchResult,
  getQuarterly
} = require('./utils')

const getCurrentQuarterlyData = (year, quarterly) => {
  const date = new Date()
  year = parseInt(year || date.getFullYear(), 10)

  const month = date.getMonth() + 1
  quarterly = parseInt(quarterly || getQuarterly(month))

  let res = items.filter(item => {
    const id = item.id.split('_')

    if (year === parseInt(id[0], 10) &&
      quarterly === getQuarterly(parseInt(id[1]))) {
      return item
    }
  })

  return res
}

router.get('/data', function (req, res, next) {
  let { keyword, id } = req.query

  if (keyword) {
    keyword = decodeURI(keyword)
    const data = filterSearchResult(items, keyword)

    res.json({
      code: 0,
      data,
      sites: data.length ? sites : {}
    })
  } else if (id) {
    const idAry = id.split('-')

    res.json({
      code: 0,
      data: getCurrentQuarterlyData(idAry[0], idAry[1]),
      sites
    })
  } else {
    res.json({
      code: 0,
      data: getCurrentQuarterlyData(),
      sites
    })
  }
})

module.exports = router
