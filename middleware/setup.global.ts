import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import type { BgmtvUser } from '@/types/bgmtv'

export default defineNuxtRouteMiddleware(async () => {
  const { setLogin } = useBgmtv()
  const { getSession, updateSession } = useH3Session()
  const { fetch } = useBgmtvFetch()

  if (import.meta.server) {
    const event = useRequestEvent()
    const { data } = await getSession(event!)

    // console.info('bgm.tv auth session', data)

    setLogin(!!data.access_token)

    if (data.access_token && !data.user) {
      // set user data to session
      const data = (await fetch('/v0/me', {}, event)) as BgmtvUser

      if (data) {
        await updateSession(event!, {}, { user: data })
      }
    }
  }
})
