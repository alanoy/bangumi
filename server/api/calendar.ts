import { items } from 'bangumi-data'
import { useBgmtvFetch } from '@/composables/useBgmtvFetch'
import type { BgmtvCalendar } from '@/types/bgmtv'
import { mergeBgmItems } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

export default defineEventHandler(async () => {
  const { fetch } = useBgmtvFetch()

  async function getBgmtvCalendar(): Promise<BgmtvItem[]> {
    try {
      const data = (await fetch('/calendar')) as BgmtvCalendar[]
      let bgmtvItems: BgmtvItem[] = []

      data.forEach(_ => {
        bgmtvItems = bgmtvItems.concat(_.items)
      })

      const items = mergeBgmItems(bgmItems, bgmtvItems)
      return items
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const items = await getBgmtvCalendar()
  return { items }
})
