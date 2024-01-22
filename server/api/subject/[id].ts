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

  async function getSubject() {
    return (await fetch(`/v0/subjects/${id}`, {}, event)) as BgmtvSubject
  }

  async function getCollection() {
    try {
      const { getSession } = useH3Session()
      const { data: auth } = await getSession(event)
      const collectionUrl = getUrl(`/v0/users/${auth.user.username}/collections/${id}`, false)
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
