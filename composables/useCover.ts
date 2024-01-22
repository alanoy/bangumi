export const useCover = (images: BgmImages, size = 'large') => {
  const placeholder = '/not-available.png'
  const target = images?.[size as keyof BgmImages] || placeholder
  const suffix = target.split('.').pop()

  return {
    placeholder,
    target,
    type: `image/${suffix}`,
  }
}
