export const useFavorite = () => {
  const stored = localStorage.getItem('favorite')
  let favItems: BgmItem[] = []

  if (stored) {
    favItems = JSON.parse(stored)
  }

  return favItems
}
