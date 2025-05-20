import { useH3Session } from '@/composables/useSession'
import type { BgmtvAuthRequestBody } from '@/types/bgmtv'

export default defineNuxtRouteMiddleware(async () => {
  const { bgmtv } = useRuntimeConfig().app
  const { authorize } = useBgmtv()
  const { updateSession, clearSession, isExpired } = useH3Session()

  if (import.meta.server) {
    const event = useRequestEvent()
    const status = await isExpired(event!)

    if (status.isExpired) {
      // console.warn('bgm.tv session expired')

      const params: BgmtvAuthRequestBody = {
        client_id: bgmtv.appId,
        client_secret: bgmtv.secret,
        grant_type: 'refresh_token',
        refresh_token: status.refresh_token,
        redirect_uri: bgmtv.redirectURI,
      }

      const { data, message } = await authorize(params)

      // console.log('refresh bgm.tv token', data)

      if (data?.access_token) {
        await updateSession(event!, { maxAge: data.expires_in }, data)
        return navigateTo(event!.path, { redirectCode: 301 })
      }

      if (message.includes('token has expired')) {
        await clearSession(event!)
        return navigateTo('/auth/bgmtv', { redirectCode: 301 })
      }

      throw createError({
        statusCode: 400,
        statusMessage: message || 'bgm.tv authorize failed',
      })
    }
  }
})
