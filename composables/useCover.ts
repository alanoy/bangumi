export const useCover = (images: BgmImages | string, size = 'large') => {
  const placeholder = '/not-available.png'
  let target: string

  if (typeof images === 'string') {
    target = images
  } else {
    target = images?.[size as keyof BgmImages] || placeholder
  }

  const suffix = target.split('.').pop()

  if (target.indexOf('http://') === 0) {
    target = target.replace('http://', 'https://')
  }

  return {
    placeholder,
    target,
    type: `image/${suffix}`,
  }
}
