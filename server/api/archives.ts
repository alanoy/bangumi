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
    if (!item.begin) {
      return false
    }

    const date = item.begin.split('T')[0].split('-')
    const year = date[0]
    const month = parseInt(date[1], 10)
    const quarter = getQuarter(month)

    yearly[year] ??= {}
    yearly[year][quarter] ??= 0
    yearly[year][quarter] += 1
  })

  for (const year in yearly) {
    items.push({
      year,
      items: yearly[year],
    })
  }

  items.reverse()
  return items
}

export default defineEventHandler(() => {
  const items = getArchives()
  return { items }
})
