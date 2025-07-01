<script lang="ts" setup>
const props = defineProps<{
  item: BgmItem
}>()

const { t } = useI18n()
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

  return year && month && day
    ? {
        isBegin,
        date: `${year}/${month}/${day}`,
      }
    : {}
})

const status = computed(() => {
  const { end, eps } = props.item
  if (end) return t('onAir.ended')

  if (begin.value.isBegin) {
    let res = t('onAir.ongoing')
    if (eps) res += `(${t('total.episodes')} ${eps})`
    return res
  }

  return `${begin.value.date}`
})
</script>

<template>
  <div
    v-if="begin.date"
    class="opacity-80 badge badge-soft"
    :class="`${item.end ? 'badge-ghost' : 'badge-secondary'}`"
  >
    {{ status }}
  </div>
</template>
