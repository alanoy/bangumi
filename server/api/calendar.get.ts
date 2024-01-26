import { items } from 'bangumi-data'
import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import type { BgmtvCalendar } from '@/types/bgmtv'
import { mergeBgmItems } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

export default defineEventHandler(async () => {
  const { fetch } = useBgmtvFetch()

  async function getBgmtvCalendar(): Promise<{ items?: BgmtvItem[]; error?: IError }> {
    try {
      const data = (await fetch('/calendar')) as BgmtvCalendar[]
      let bgmtvItems: BgmtvItem[] = []

      data.forEach(_ => {
        bgmtvItems = bgmtvItems.concat(_.items)
      })

      const items = mergeBgmItems(bgmItems, bgmtvItems)
      return { items }
    } catch (err) {
      console.error('/api/calendar error::', err)
      return {
        error: createError({
          statusCode: 500,
          statusMessage: 'bgm.tv:: get calendar failed',
        }),
      }
    }
  }

  const result = await getBgmtvCalendar()
  return result
})
