export const getBgmId = (item: BgmItem): number | null => {
  const id = item?.sites?.find(({ site }: BgmSite) => site === 'bangumi')?.id
  return id ? Number(id) : null
}

export const getQuarter = (month: number) => [1, 4, 7, 10][Math.floor((month - 1) / 3)]

export const mergeBgmItems = (bgmItems: BgmItem[], bgmtvItems: BgmtvItem[]) => {
  return bgmtvItems.map(item => {
    const bgmItem = bgmItems.find(bgm => {
      const bgmId = getBgmId(bgm)
      return bgmId !== null && bgmId === item.id
    })

    return {
      ...item,
      ...(bgmItem || {}),
    }
  })
}

export const getLocalObject = (key: string) => {
  const dataString = localStorage.getItem(key)

  return dataString ? JSON.parse(dataString) : null
}

export const setLocalObject = (key: string, value: Record<string, any>) => {
  const data = getLocalObject(key) || {}

  Object.assign(data, value)
  localStorage.setItem(key, JSON.stringify(data))
}

export const sleep = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms))
