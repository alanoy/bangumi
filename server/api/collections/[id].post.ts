import { useBgmtvFetch } from '@/composables/useBgmtvFetch'

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  const { fetch, getUrl } = useBgmtvFetch()

  if (!id) {
    return { message: 'id is required' }
  }

  // type: 1: 想看, 2: 看过, 3: 在看, 4: 搁置, 5: 抛弃
  // rate: 评分. minimum 0, maximum 10, 0 means delete
  const { type, rate }: { type?: number; rate?: number } = await readBody(event)
  const body: { type?: number; rate?: number; private: boolean } = { private: true }

  if (!isNaN(Number(rate))) {
    body.rate = rate
    body.type = 2
  } else {
    body.type = type || 1
  }

  try {
    const url = getUrl(`/v0/users/-/collections/${id}`, false)
    await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      },
      event,
    )

    return {
      message: 'success',
    }
  } catch (error) {
    console.error(error)
    return { message: 'failed' }
  }
})
