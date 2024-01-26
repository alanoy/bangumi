import { items } from 'bangumi-data'
import { getBgmId } from '@/utils'
import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import { useH3Session } from '@/composables/useSession'
import type { BgmtvCollection } from '@/types/bgmtv'

const bgmItems = items as unknown as BgmItem[]

function mergeItems(collections: BgmtvCollection[]) {
  return collections.map(collection => {
    const { subject } = collection
    const bgmItem = bgmItems.find(bgm => {
      const bgmId = getBgmId(bgm)
      return bgmId !== null && bgmId === collection.subject_id
    })

    return {
      ...bgmItem,
      type: subject.type,
      air_date: subject.date,
      images: subject.images,
      name: subject.name,
      name_cn: subject.name_cn,
      updated_at: collection.updated_at,
      rating: {
        rank: subject.rank,
        score: subject.score,
      },
      rating_score: subject.score,
      rank: subject.rank,
      eps: subject.eps,
      id: subject.id,
      collection_type: collection.type,
    }
  })
}

export default defineEventHandler(async event => {
  const { limit, offset } = getQuery(event)
  const { getUrl, fetch } = useBgmtvFetch()
  const { getSession } = useH3Session()

  try {
    const auth = await getSession(event)
    const { username } = auth.data.user
    const res = (await fetch(
      getUrl(`/v0/users/${username}/collections`, { isMock: false }),
      {
        params: { limit, offset },
      },
      event,
    )) as { data: BgmtvCollection[]; limit: number; total: number }

    return {
      items: mergeItems(res.data),
      limit: res.limit,
      total: res.total,
    }
  } catch (err) {
    console.error('get collections error::', err)
    return {
      error: createError({
        statusCode: 500,
        statusMessage: 'bgm.tv:: Failed to fetch collections',
      }),
    }
  }
})
