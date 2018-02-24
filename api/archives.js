const { items } = require('bangumi-data')
const { getQuarterly } = require('./utils')

module.exports = (req, res) => {
  let temp = {}
  let data = []

  items.forEach(item => {
    if (!item.begin) return false

    let id = item.begin.split('T')[0]
    id = id.split('-')
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

  res.end(JSON.stringify({
    code: 0,
    data
  }))
}
