export const useCollections = () => {
  const storageKey = 'collections'
  const { t } = useI18n()
  const collecting = ref(false)

  function getLocalCollections(): BgmItem[] {
    const stored = localStorage.getItem(storageKey)
    let items: BgmItem[] = []

    if (stored) {
      items = JSON.parse(stored)
    }

    return items
  }

  function setLocalCollections(item: BgmItem) {
    const items = getLocalCollections()
    const index = items.findIndex(_ => _.id === item.id)

    if (index > -1) {
      items.splice(index, 1)
    } else {
      items.push(item)
    }

    localStorage.setItem(storageKey, JSON.stringify(items))
  }

  function getLocalIds(): string {
    const items = getLocalCollections()

    return items.length ? items.map(_ => _.id).join(',') : ''
  }

  function getType(text: string | undefined): number | undefined {
    switch (text) {
      case 'WISH':
        return 1
      case 'WATCHED':
        return 2
      case 'WATCHING':
        return 3
      case 'STALLED':
        return 4
      case 'ABANDONED':
        return 5
      default:
        return undefined
    }
  }

  function getTypeText(type: number | undefined) {
    if (!type) {
      return t('collections.title')
    }

    return t(`collections.type.${type}`)
  }

  function getStatusClass(type: number | undefined) {
    // 1: 想看, 2: 看过, 3: 在看, 4: 搁置, 5: 抛弃
    let status

    switch (type) {
      case 1:
        status = 'base-content'
        break
      case 2:
        status = 'success'
        break
      case 3:
        status = 'info'
        break
      case 4:
        status = 'warning'
        break
      case 5:
        status = 'gray-500'
        break
      default:
        status = 'error'
    }

    return `text-${status}`
  }

  async function setBgmtvCollections(id: number, params: { type?: number; rate?: number }) {
    collecting.value = true
    const res = await $fetch(`/api/collections/${id}`, {
      method: 'POST',
      body: params,
    })

    collecting.value = false
    return res
  }

  return {
    getLocalCollections,
    setLocalCollections,
    getLocalIds,
    getStatusClass,
    getType,
    getTypeText,
    collecting,
    setBgmtvCollections,
  }
}
