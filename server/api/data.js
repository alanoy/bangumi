const { siteMeta, items } = require('bangumi-data')
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
    if (!item.begin) return false

    let id = item.begin.split('T')[0]
    id = id.split('-')

    if (year === parseInt(id[0], 10) &&
      quarterly === getQuarterly(parseInt(id[1]))) {
      return item
    }
  })

  return res
}

module.exports = (req) => {
  let { keyword, id } = req.query

  if (keyword) {
    keyword = decodeURI(keyword)
    const data = filterSearchResult(items, keyword)

    return {
      code: 0,
      data,
      sites: data.length ? siteMeta : {}
    }
  } else if (id) {
    const idAry = id.split('-')

    return {
      code: 0,
      data: getCurrentQuarterlyData(idAry[0], idAry[1]),
      sites: siteMeta
    }
  } else {
    return {
      code: 0,
      data: getCurrentQuarterlyData(),
      sites: siteMeta
    }
  }
}
