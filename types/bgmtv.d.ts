export interface BgmtvCalendar {
  weekday: { en: string; ja: string; cn: string; id: number }
  items: BgmtvItem[]
}

export interface BgmtvAuthRequestBody {
  grant_type: string
  client_id: string
  client_secret: string
  redirect_uri: string
  refresh_token?: string
  code?: string
  state?: number | string
}

export interface BgmtvAuthResponse {
  access_token: string
  expires_in: number // 604800
  token_type: string
  scope?: null
  refresh_token: string
  user_id: number
}

export interface BgmtvUser {
  avatar: {
    large: string
    medium: string
    small: string
  }
  sign: string
  username: string
  nickname: string
  id: number
  user_group: number
}

interface BgmtvInfobox {
  key: string
  value: string | BgmtvInfoboxValue[]
}

interface BgmtvInfoboxValue {
  v: string
  k?: string
}

interface BgmtvTag {
  name: string
  count: number
}

export interface BgmtvSubject {
  id: number
  type: number
  name: string
  name_cn: string
  summary: string
  nsfw: boolean
  locked: boolean
  date: string
  platform: string
  images: BgmImages
  infobox: BgmtvInfobox[]
  volumes: number
  eps: number
  total_episodes: number
  rating: BgmRating
  collection: BgmCollection
  tags: BgmtvTag[]
}

export interface BgmtvCollection {
  updated_at: string
  comment: null
  tags: BgmtvTag[]
  subject: {
    date: string
    images: BgmImages
    name: string
    name_cn: string
    short_summary: string
    tags: BgmtvTag[]
    score: number
    type: number
    id: number
    eps: number
    volumes: number
    collection_total: number
    rank: number
  }
  subject_id: number
  vol_status: number
  ep_status: number
  subject_type: number
  type: number
  rate: number
  private: boolean
}
