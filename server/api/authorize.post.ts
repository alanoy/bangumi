import type { BgmtvAuthResponse } from '@/types/bgmtv'

export default defineEventHandler(async event => {
  const { bgmtv } = useRuntimeConfig().app
  const body = await readBody(event)

  try {
    const data: BgmtvAuthResponse = await $fetch('https://bgm.tv/oauth/access_token', {
      body,
      method: 'POST',
      headers: {
        'User-Agent': bgmtv.userAgent,
      },
    })

    console.info('bgmtv oauth', data)

    if (data) {
      return { message: 'success', data }
    }

    return { message: 'failed' }
  } catch (error) {
    console.error('bgmtv oauth', error)
    throw createError({
      statusCode: 400,
      statusMessage: 'bgm.tv authorize failed',
    })
  }
})
