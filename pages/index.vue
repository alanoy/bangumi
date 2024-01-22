<script lang="ts" setup>
const route = useRoute()
const origin = ref<BgmItem[]>([]) // origin calendar items
const list = ref<BgmItem[]>([]) // items to be displayed
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

async function getCalendar() {
  const { data } = await useFetch('/api/calendar')

  if (!data.value) return
  handleCalendar(data.value as { items: BgmItem[] })
}

function handleCalendar(data: { items: BgmItem[] }) {
  origin.value = data.items
  filterByWeekday(weekday.value, data.items)
}

await getCalendar()
</script>

<template>
  <section>
    <IndexHeader
      :total="origin.length"
      :year="year"
      :current-weekday="weekday"
      @filter="filterByWeekday"
    />

    <BgmList :items="list" />
  </section>
</template>
