import { items } from 'bangumi-data'
import { getQuarter } from '@/utils'

const bgmItems = items as unknown as BgmItem[]

interface BgmQuarterly {
  [quarter: number | string]: number
}

interface BgmYearly {
  [year: number | string]: BgmQuarterly
}

interface BgmArchive {
  year: string
  items: {
    [key: string]: number
  }
}

function getArchives(): BgmArchive[] {
  const yearly: BgmYearly = {}
  const items: BgmArchive[] = []

  bgmItems.forEach(item => {
    if (!item.begin) return

    const [yearStr = '', monthStr = ''] = item.begin.split('T')[0]?.split('-') ?? []
    if (!yearStr) return

    const quarter = getQuarter(parseInt(monthStr, 10))
    const quarterCounts = (yearly[yearStr] ??= {})
    quarterCounts[quarter] = (quarterCounts[quarter] ?? 0) + 1
  })

  for (const [year, quarterCounts] of Object.entries(yearly)) {
    items.push({ year, items: quarterCounts })
  }

  items.reverse()
  return items
}

export default defineEventHandler(() => {
  const items = getArchives()
  return { items }
})
