<script lang="ts" setup>
import type { BgmtvCalendar } from '@/types/bgmtv'

const route = useRoute()
const origin = ref<BgmItem[]>([]) // origin calendar items
const list = ref<BgmItem[]>([]) // items to be displayed
const error = ref<IError | undefined>(undefined)
const today = new Date()
const year = today.getFullYear()
const weekday: ComputedRef<number> = computed(() => {
  const { weekday } = route.query
  return typeof weekday !== 'undefined' ? Number(weekday) : today.getDay() + 1
})

definePageMeta({
  keepAlive: true,
})

function filterByWeekday(weekdayNumber: number, items: BgmItem[] = origin.value) {
  if (weekdayNumber === 0) {
    list.value = items
    return
  }

  list.value = items.filter(item => {
    const day = new Date(item.air_date).getDay()
    return day === weekdayNumber - 1
  })
}

const pending = ref(false)
const CALENDAR_CACHE_KEY = 'calendar'
const CALENDAR_TTL = 60 * 60 * 1000 // 1h,对齐 bgm.tv 的 cache-control

function handleCalendar(data: { items?: BgmItem[]; error?: IError }) {
  if (data.items) {
    origin.value = data.items
    filterByWeekday(weekday.value, data.items)
  }

  if (data.error) {
    error.value = data.error
  }
}

async function loadCalendar() {
  pending.value = true
  error.value = undefined

  // 命中本地缓存(<1h)直接用
  const cached = process.client ? getLocalObject(CALENDAR_CACHE_KEY) : null
  if (cached?.items && Date.now() - cached.ts < CALENDAR_TTL) {
    handleCalendar({ items: cached.items })
    pending.value = false
    return
  }

  try {
    // 浏览器直连 bgm.tv —— 绕开 Vercel serverless 10s 上限(bgm.tv /calendar 要 15s+)。
    // CORS 已开放,加重试覆盖间歇 502。
    const data = await $fetch<BgmtvCalendar[]>('https://api.bgm.tv/calendar', {
      retry: 2,
      retryDelay: 500,
      timeout: 30000,
    })
    const bgmtvItems = data.flatMap(_ => _.items)

    // 合并本地数据走 server route(用 5.6MB bangumi-data,不进客户端 bundle;且不调 bgm.tv,秒级不超时)
    const { items } = await $fetch<{ items: BgmItem[] }>('/api/calendar/merge', {
      method: 'POST',
      body: { items: bgmtvItems },
    })

    handleCalendar({ items })
    if (process.client) {
      setLocalObject(CALENDAR_CACHE_KEY, { items, ts: Date.now() })
    }
  } catch {
    // bgm.tv 仍失败:有过期缓存就先兜底,否则提示
    const stale = process.client ? getLocalObject(CALENDAR_CACHE_KEY) : null
    if (stale?.items) {
      handleCalendar({ items: stale.items })
    } else {
      error.value = { message: 'bgm.tv 日历暂时不可用,请稍后重试' }
    }
  } finally {
    pending.value = false
  }
}

if (process.client) {
  loadCalendar()
}
</script>

<template>
  <section>
    <IndexHeader
      :total="origin.length"
      :year="year"
      :current-weekday="weekday"
      @filter="filterByWeekday"
    />

    <div
      v-if="pending && !list.length"
      class="flex justify-center py-20"
    >
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <BgmList
      v-show="list.length"
      :items="list"
    />

    <NoResult
      v-show="error"
      :error="error"
    />
  </section>
</template>
