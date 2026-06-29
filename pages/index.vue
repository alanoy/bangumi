<script lang="ts" setup>
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

const { data: calendar, error: fetchError } = await useFetch('/api/calendar', {
  server: false,
})

watch(
  calendar,
  value => {
    if (!value) return
    handleCalendar(value as { items?: BgmItem[]; error?: IError })
  },
  { immediate: true },
)

watch(fetchError, (err: any) => {
  if (err) {
    error.value = { message: err.statusMessage || err.message }
  }
})

function handleCalendar(data: { items?: BgmItem[]; error?: IError }) {
  if (data.items) {
    origin.value = data.items
    filterByWeekday(weekday.value, data.items)
  }

  if (data.error) {
    error.value = data.error
  }
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
