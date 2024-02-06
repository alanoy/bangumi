import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import { BgmtvSubject, BgmtvCollection } from '@/types/bgmtv'
import { useH3Session } from '~/composables/useSession'

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  const { fetch, getUrl } = useBgmtvFetch()

  if (!id) {
    return {
      message: 'id is required',
    }
  }

  const { getSession } = useH3Session()
  const auth = await getSession(event)
  const { user } = auth.data

  if (!user) {
    return {
      error: createError({
        statusCode: 401,
        statusMessage: 'bgm.tv:: login required',
      }),
    }
  }

  async function getSubject() {
    const subjectUrl = getUrl(`/v0/subjects/${id}`, { isMock: false })
    return (await fetch(subjectUrl, {}, event)) as BgmtvSubject
  }

  async function getCollection() {
    try {
      const { username } = user
      const collectionUrl = getUrl(`/v0/users/${username}/collections/${id}`, { isMock: false })
      return (await fetch(collectionUrl, {}, event)) as BgmtvCollection
    } catch (err) {
      console.error(err)
      return null
    }
  }

  try {
    const [subject, collection] = await Promise.all([getSubject(), getCollection()])

    return {
      subject: subject as BgmtvSubject,
      collection: collection as BgmtvCollection,
    }
  } catch (err) {
    console.log('get subject error::', err)
    return {
      error: createError({
        statusCode: 500,
        statusMessage: 'bgm.tv:: get subject failed',
      }),
    }
  }
})
