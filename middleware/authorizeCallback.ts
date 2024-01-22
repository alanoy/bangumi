import { useH3Session } from '@/composables/useSession'

export default defineNuxtRouteMiddleware(async to => {
  const { bgmtv } = useRuntimeConfig().app
  const { authorize } = useBgmtv()
  const { updateSession } = useH3Session()
  const { code, state } = to.query
  const body = {
    grant_type: 'authorization_code',
    client_id: bgmtv.appId,
    client_secret: bgmtv.secret,
    code: code as string,
    redirect_uri: bgmtv.redirectURI,
    state: state as string,
  }

  if (process.server && code) {
    const event = useRequestEvent()
    const { message, data } = await authorize(body)

    if (message === 'success' && data?.access_token) {
      await updateSession(event, { maxAge: data.expires_in }, data)
      return navigateTo('/', { redirectCode: 301 })
    }
  }
})
