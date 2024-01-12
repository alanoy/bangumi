import { items } from 'bangumi-data'
import { getQuarter, getBgmId } from '../../../utils'

const bgmItems = items as unknown as BgmItem[]

/* @param quater {string}: '2023-1' */
function getArchive(quarter = ''): BgmItem[] {
  if (!quarter || quarter.split('-').length !== 2) {
    return []
  }

  const [year, quarterly] = quarter.split('-')
  const items = bgmItems.filter(item => {
    if (!item.begin || item.lang === 'zh-Hans') return false
    const datetime = item.begin.split('T')[0].split('-')
    const id = getBgmId(item)

    return (
      id &&
      Number(year) === parseInt(datetime[0], 10) &&
      Number(quarterly) === getQuarter(parseInt(datetime[1], 10))
    )
  })

  return items.map(item => {
    const id = getBgmId(item)
    if (id) item.id = id
    return item
  })
}

export default defineEventHandler(event => {
  const date = getRouterParam(event, 'date')
  const items = getArchive(date)
  return { items }
})
