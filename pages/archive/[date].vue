<script lang="ts" setup>
const route = useRoute()
const items = ref<BgmItem[]>([])
const { date } = route.params as { date: string }
const [year, quarterly] = date.split('-')
const { data } = await useFetch(`/api/archive/${date}`)
const { quarterToLocaleString } = useDate()
const sortBy = ref<'score' | 'votes'>('votes')

useHead({
  title: quarterToLocaleString(Number(year), Number(quarterly)),
})

definePageMeta({
  keepAlive: true,
})

if (data.value) {
  handleData(data.value as { items: BgmItem[] })
}

function handleData(data: { items: BgmItem[] }) {
  items.value = data.items
}

const sortedItems = computed(() => {
  return [...items.value].sort((a, b) => {
    const aScore = a.rating?.score || 0
    const bScore = b.rating?.score || 0
    const aVotes = a.rating?.total || 0
    const bVotes = b.rating?.total || 0

    switch (sortBy.value) {
      case 'score':
        if (bScore !== aScore) return bScore - aScore
        return bVotes - aVotes // tie-breaker
      case 'votes':
        if (bVotes !== aVotes) return bVotes - aVotes
        return bScore - aScore // tie-breaker
      default:
        return 0
    }
  })
})

const sortOptions = [
  { value: 'votes', label: 'sortOptions.votes' },
  { value: 'score', label: 'sortOptions.score' },
]
</script>

<template>
  <section>
    <IndexHeader
      v-model:sort-by="sortBy"
      :total="items.length"
      :year="Number(year)"
      :quarterly="Number(quarterly)"
      :sort-options="sortOptions"
    />

    <BgmList :items="sortedItems" />
  </section>
</template>
