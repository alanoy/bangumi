export const useWeek = () =>
  useState<string[]>('week', () => ['全部', '周日', '周一', '周二', '周三', '周四', '周五', '周六'])

export const useMetas = () => {
  const metas = useState<BgmMeta>('metas', () => ({}))

  const setMetas = (value: BgmMeta) => {
    metas.value = value
  }

  return { metas, setMetas }
}
