export default defineNuxtRouteMiddleware(async () => {
  const { setLogin, getUser } = useBgmtv()
  const { getSession, updateSession } = useH3Session()

  if (process.server) {
    const event = useRequestEvent()
    const { data } = await getSession(event)

    setLogin(!!data.access_token)

    if (data.access_token && !data.user) {
      // set user data to session
      await getUser(async user => {
        await updateSession(event, {}, { user })
      })
    }
  }
})
