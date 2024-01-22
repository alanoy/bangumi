export const useWeek = () => {
  const { locale } = useI18n()
  let week: string[] = []

  if (locale.value === 'zh-cn') {
    week = ['全部', '周日', '周一', '周二', '周三', '周四', '周五', '周六']
  } else {
    week = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }

  return useState<string[]>('week', () => week)
}

export const useMetas = () => {
  const metas = useState<BgmMeta>('metas', () => ({}))

  const setMetas = (value: BgmMeta) => {
    metas.value = value
  }

  return { metas, setMetas }
}
