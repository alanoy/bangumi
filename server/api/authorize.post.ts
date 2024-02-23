import { FetchError } from 'ofetch'
import type { BgmtvAuthResponse } from '@/types/bgmtv'

export default defineEventHandler(async event => {
  const { bgmtv } = useRuntimeConfig().app
  const body = await readBody(event)

  const data = await $fetch<BgmtvAuthResponse | { error_description: string }>(
    'https://bgm.tv/oauth/access_token',
    {
      body,
      method: 'POST',
      headers: {
        'User-Agent': bgmtv.userAgent,
      },
    },
  ).catch((error: FetchError) => {
    // console.error('authorize error', error.data)

    return error.data
  })

  if (data?.access_token) {
    return { message: 'success', data }
  }

  if (data?.error_description) {
    return { message: data.error_description }
  }

  return { message: 'failed' }
})
