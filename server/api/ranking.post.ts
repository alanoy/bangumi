import { items } from 'bangumi-data'
import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import { mergeBgmItems } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

export default defineEventHandler(async event => {
  const maxRanking = 500
  const { fetch, getUrl } = useBgmtvFetch()
  const { offset, limit }: { offset: number; limit: number } = await readBody(event)
  const url = getUrl(`/v0/search/subjects?limit=${limit}&offset=${offset}`, { isMock: false })
  const body = {
    sort: 'rank',
    keyword: '',
    filter: {
      type: [2], // anime only
      rank: ['>0', `<=${maxRanking}`], // top 500
    },
  }

  try {
    const { data, total } = (await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })) as { data: BgmItem[]; total: number[] }

    return {
      message: 'success',
      items: mergeBgmItems(bgmItems, data),
      total,
    }
  } catch (error) {
    console.error('update collection error::', error)
    return {
      error: createError({
        statusCode: 500,
        statusMessage: 'bgm.tv:: update collection error',
      }),
    }
  }
})
