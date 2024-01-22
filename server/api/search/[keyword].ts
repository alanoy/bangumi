import { items } from 'bangumi-data'
import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import { mergeBgmItems } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

export default defineEventHandler(async event => {
  const keyword = getRouterParam(event, 'keyword')

  async function searchBgmtv(keyword = ''): Promise<BgmtvItem[]> {
    if (!keyword) {
      return []
    }

    const { fetch } = useBgmtvFetch()

    try {
      const url = `/search/subject/${encodeURIComponent(keyword)}`
      const data = (await fetch(url, {
        params: {
          type: 2,
          responseGroup: 'large',
          chii_searchDateLine: Date.now(),
        },
      })) as { results: number; list: BgmtvItem[] }

      if (!data?.list) return []

      return mergeBgmItems(bgmItems, data.list)
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const items = await searchBgmtv(keyword)
  return { items }
})
