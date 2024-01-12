import { siteMeta } from 'bangumi-data'

export default defineEventHandler(() => {
  return { metas: siteMeta }
})
