interface NavbarMenu {
  title: string
  route: string
  icon?: string
  classname?: string
}

interface BgmtvItem {
  id: number
  url: string
  type: string | number
  name: string
  name_cn: string
  summary?: string
  air_date: string
  air_weekday?: string | null
  broadcast?: string
  rating: BgmRating | null
  rating_score?: number | null
  rank?: number | null
  score?: number | null
  eps?: number | null
  eps_count?: number | null
  image?: string
  images: BgmImages
  collection?: BgmCollection
  platform?: string | null // TV, Web, PS4, etc...
  total_episodes?: number | null
  volumes?: number | null
  locked?: boolean | null
  nsfw?: boolean | null
  updated_at?: Date | null
  title?: string | null
  collection_type?: number
}

interface BgmItem extends BgmtvItem {
  titleTranslate?: {
    [key: string]: string[]
  }
  lang?: string
  officialSite?: string
  begin?: string
  end?: string
  sites?: BgmSite[]
}

interface BgmRating {
  rank: number
  total?: number
  score: number
  count?: {
    [key: string]: number
  }
}

interface BgmImages {
  large: string
  common: string
  medium: string
  small: string
  grid: string
}

interface BgmCollection {
  doing: number
  on_hold: number
  dropped: number
  wish: number
  collect: number
}

interface BgmSite {
  site: string
  id: string
  begin?: string
  broadcast?: string
  url?: string
}

interface BgmMeta {
  [key: string]: BgmMetaItem
}

interface BgmMetaItem {
  title: string
  urlTemplate: string // example: 'https://bgm.tv/subject/{{id}}'
  type: string // 'info' 信息网站, 'onair' 播放网站, 'resource' 下载网站
  regions?: string[]
}

interface ArchiveItem {
  year: string
  items: {
    [key: string]: number
  }
}

interface ToastItem {
  message: string
  type: string
  timeout?: number
}

interface IError {
  statusCode?: number
  statusMessage?: string
  message?: string
  description?: string
}
