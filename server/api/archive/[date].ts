import { items } from 'bangumi-data'
import { getQuarter, getBgmId } from '@/utils'
import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import type { BgmtvSubject } from '@/types/bgmtv'

const bgmItems = items as unknown as BgmItem[]

/* @param quarter {string}: '2023-1' */
async function getArchive(quarter = ''): Promise<BgmItem[]> {
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

  const { fetch } = useBgmtvFetch()
  await Promise.all(
    items.map(async item => {
      const id = getBgmId(item)
      if (!id) return null
      item.id = id

      try {
        const url = `/v0/subjects/${id}`
        const data = (await fetch(url, { isMock: false })) as BgmtvSubject
        item.images = data.images
        item.rating = {
          score: data.rating.score,
          total: data.rating.total,
        } as BgmRating
      } catch (err) {
        if (err instanceof Error && err.message.includes('404')) {
          console.debug(`Subject ${id} not found`)
        } else {
          console.error(`Failed to fetch subject ${id}:`, err)
        }
      }
    }),
  )

  return items
}

export default defineEventHandler(async event => {
  const date = getRouterParam(event, 'date')
  const items = await getArchive(date)
  return { items }
})
