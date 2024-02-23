import { updateSession, getSession, clearSession } from 'h3'
import type { H3Event } from 'h3'
import type { BgmtvAuthResponse, BgmtvUser } from '@/types/bgmtv'

interface SessionConfig {
  maxAge?: number
}

export const useH3Session = () => {
  const { sessionSecret: password } = useRuntimeConfig().app

  async function get(event: H3Event) {
    return await getSession(event, { password })
  }

  async function update(
    event: H3Event,
    config: SessionConfig,
    data: BgmtvAuthResponse | { user: BgmtvUser },
  ) {
    const { data: sessionData } = await get(event)
    await updateSession(event, { password, ...config }, Object.assign({}, sessionData, data))
  }

  async function clear(event: H3Event) {
    await clearSession(event, { password })
  }

  async function getAuthorizationHeader(event: H3Event): Promise<{ Authorization?: string }> {
    const { data } = await get(event)
    if (data.access_token) {
      return {
        Authorization: `${data.token_type} ${data.access_token}`,
      }
    }

    return {}
  }

  async function isExpired(
    event: H3Event,
  ): Promise<{ isExpired: boolean; refresh_token?: string }> {
    const { createdAt, data } = await get(event)
    const expiresIn = data.expires_in

    // console.log('isExpired', data)

    if (expiresIn) {
      return {
        isExpired: (Date.now() - Number(createdAt)) / 1000 > expiresIn,
        refresh_token: data.refresh_token,
      }
    }

    return {
      isExpired: false,
    }
  }

  return {
    getSession: get,
    updateSession: update,
    clearSession: clear,
    getAuthorizationHeader,
    isExpired,
  }
}
