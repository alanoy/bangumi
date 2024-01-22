export default defineNuxtRouteMiddleware(() => {
  const { bgmtv } = useRuntimeConfig().app
  const url = new URL('https://bgm.tv/oauth/authorize')

  url.searchParams.set('client_id', bgmtv.appId)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('redirect_uri', bgmtv.redirectURI)
  url.searchParams.set('scope', '')
  url.searchParams.set('state', `${Date.now()}`)

  return navigateTo(url.toString(), {
    external: true,
    redirectCode: 301,
  })
})
