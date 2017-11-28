const filterSearchResult = (items, key) => {
  let res = items.filter(item => {
    if (item.title.includes(key)) {
      return item
    } else {
      const translates = item.titleTranslate
      let names = []

      for (let prop in translates) {
        names = names.concat(translates[prop])
      }

      let isMatched = false
      names.some(name => {
        if (name.includes(key)) isMatched = true
      })

      if (isMatched) return item
    }
  })

  return res
}

const getQuarterly = month => {
  return [1, 4, 7, 10][Math.floor((month - 1) / 3)]
}

module.exports = {
  filterSearchResult,
  getQuarterly
}
