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

  async function getSubject() {
    const subjectUrl = getUrl(`/v0/subjects/${id}`, false)
    return (await fetch(subjectUrl, {}, event)) as BgmtvSubject
  }

  async function getCollection() {
    try {
      const { username } = auth.data.user
      const collectionUrl = getUrl(`/v0/users/${username}/collections/${id}`, false)
      return (await fetch(collectionUrl, {}, event)) as BgmtvCollection
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const [subject, collection] = await Promise.all([getSubject(), getCollection()])

  return {
    subject: subject as BgmtvSubject,
    collection: collection as BgmtvCollection,
  }
})
