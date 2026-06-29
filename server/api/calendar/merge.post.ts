import { items as bgmItems } from 'bangumi-data'
import { mergeBgmItems } from '@/utils'

// 预加载的本地 bangumi-data(5.6MB,只能留在 server 端,不能进客户端 bundle)
const localItems = bgmItems as unknown as BgmItem[]

// 纯内存合并:用本地数据补全客户端直连拿到的 bgm.tv calendar items。
// 不调用 bgm.tv —— 所以不受 serverless 10s 超时影响,秒级返回。
export default defineEventHandler(async event => {
  const { items: bgmtvItems } = await readBody<{ items: BgmtvItem[] }>(event)

  if (!bgmtvItems?.length) {
    return { items: [] }
  }

  return { items: mergeBgmItems(localItems, bgmtvItems) }
})
