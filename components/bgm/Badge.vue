<script lang="ts" setup>
const props = defineProps<{
  item: BgmItem
}>()

const formatNumber = (num: number) => {
  const str = num.toString()
  return str[1] ? str : '0' + str
}

const begin = computed(() => {
  const { air_date: airDate, begin } = props.item
  if (!airDate && !begin) {
    return {
      isBegin: false,
      date: null,
    }
  }

  const date = new Date(airDate || begin || '')
  const year = date.getFullYear()
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())
  const currentTime = Date.now()
  const isBegin = currentTime >= date.getTime()

  return {
    isBegin,
    date: `${year}/${month}/${day}`,
  }
})

const status = computed(() => {
  const { end, eps } = props.item
  if (end) return '已结束'

  if (begin.value.isBegin) {
    let res = '放送中'
    if (eps) res += `(共 ${eps} 话)`
    return res
  }

  return `${begin.value.date} 开始`
})
</script>

<template>
  <div
    v-if="begin.date"
    class="opacity-80 badge badge-outline"
    :class="`${
      item.end ? 'badge-ghost text-ghost-content' : 'badge-secondary text-secondary-content'
    }`"
  >
    {{ status }}
  </div>
</template>
