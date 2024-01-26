import { items } from 'bangumi-data'
import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import { mergeBgmItems } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

export default defineEventHandler(async event => {
  const keyword = getRouterParam(event, 'keyword')

  async function searchBgmtv(keyword = ''): Promise<{ items?: BgmtvItem[]; error?: IError }> {
    if (!keyword) {
      return { items: [] }
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

      if (!data?.list) return { items: [] }

      return { items: mergeBgmItems(bgmItems, data.list) }
    } catch (err) {
      console.error('search error::', err)
      return {
        error: createError({
          statusCode: 500,
          statusMessage: 'search error',
        }),
      }
    }
  }

  const result = await searchBgmtv(keyword)
  return result
})
