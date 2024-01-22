import type { H3Event } from 'h3'
import { useH3Session } from './useSession'

export const useBgmtvFetch = () => {
  const { bgmtv } = useRuntimeConfig().app

  function getUrl(path: string, isMock = true) {
    const { VITE_MOCK_BASEURL: mockBaseURL } = import.meta.env
    let baseUrl = 'https://api.bgm.tv'

    if (isMock && mockBaseURL) {
      baseUrl = mockBaseURL
    }

    return `${baseUrl}${path}`
  }

  async function fetch(uri: string, options?: Record<string, any>, event?: H3Event) {
    const url = uri.indexOf('http') === 0 ? uri : getUrl(uri)
    const { headers: headersOption, ...restOptions } = options || {}
    const { getAuthorizationHeader } = useH3Session()
    let authorizationHeader = {}

    if (event) {
      authorizationHeader = await getAuthorizationHeader(event)
    }

    const headers = {
      'User-Agent': bgmtv.userAgent,
      ...authorizationHeader,
      ...(headersOption || {}),
    }

    return await $fetch(url, {
      headers,
      ...(restOptions || {}),
    })
  }

  return {
    fetch,
    getUrl,
  }
}
