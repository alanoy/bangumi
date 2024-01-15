import { items } from 'bangumi-data'
import { mergeBgmItems } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

async function searchBgmtv(keyword = ''): Promise<BgmtvItem[]> {
  if (!keyword) {
    return []
  }

  try {
    const data = (await $fetch(
      `https://api.bgm.tv/search/subject/${encodeURIComponent(keyword)}?type=2&responseGroup=large`,
    )) as { results: number; list: BgmtvItem[] }

    if (!data?.list) return []

    return mergeBgmItems(bgmItems, data.list)
  } catch (err) {
    console.error(err)
    return []
  }
}

export default defineEventHandler(async event => {
  const keyword = getRouterParam(event, 'keyword')
  const items = await searchBgmtv(keyword)
  return { items }
})
