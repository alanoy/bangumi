import { items } from 'bangumi-data'
import { getBgmId } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

function getFavorites(ids: string): BgmItem[] {
  const favIds: string[] = ids.split(',')
  const items = bgmItems.filter(({ sites, lang }) => {
    if (!sites) return false

    const favItem = sites.find(({ site, id }) => favIds.includes(id) && site === 'bangumi')
    return favItem && lang !== 'zh-Hans'
  })

  return items
    .map(item => {
      const id = getBgmId(item)
      if (id) {
        item.id = id
      }

      return item
    })
    .filter(_ => _)
}

export default defineEventHandler(event => {
  const { ids = '' } = getQuery(event)
  const items = getFavorites(ids as string)
  return { items }
})
