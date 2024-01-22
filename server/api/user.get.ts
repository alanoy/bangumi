import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import type { BgmtvUser } from '@/types/bgmtv'

export default defineEventHandler(async event => {
  const { fetch } = useBgmtvFetch()

  try {
    const data = (await fetch('/v0/me', {}, event)) as BgmtvUser

    console.info('bgmtv user', data)

    if (data) {
      return { message: 'success', data }
    }

    return { message: 'failed' }
  } catch (error) {
    console.error('bgmtv user', error)
    throw createError({
      statusCode: 400,
      statusMessage: 'bgm.tv get user failed',
    })
  }
})
