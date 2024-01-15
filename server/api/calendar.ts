import { items } from 'bangumi-data'
import { BgmtvCalendar } from '@/types/bgmtv'
import { mergeBgmItems } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

async function getBgmtvCalendar(): Promise<BgmtvItem[]> {
  try {
    const data: BgmtvCalendar[] = await $fetch('https://api.bgm.tv/calendar')
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

export default defineEventHandler(async () => {
  const items = await getBgmtvCalendar()
  return { items }
})
