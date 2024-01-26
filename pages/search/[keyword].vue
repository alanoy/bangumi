<script lang="ts" setup>
const route = useRoute()
const items = ref<BgmItem[]>([])
const keyword = ref<string>('')
const { t } = useI18n()
const error = ref<IError | undefined>(undefined)

useHead({
  title: t('search'),
})

definePageMeta({
  keepAlive: true,
})

const { pending, data: searchResult } = await useAsyncData(
  'search',
  () => $fetch(`/api/search/${encodeURIComponent(keyword.value)}`),
  {
    immediate: false,
    watch: [keyword],
  },
)

watch(
  () => searchResult.value,
  (data: any) => {
    if (data.items) {
      items.value = data.items
    }

    if (data.error) {
      error.value = data.error
    }
  },
)

if (route.params.keyword) {
  keyword.value = route.params.keyword as string
}
</script>

<template>
  <section>
    <NoResult
      v-show="!pending && !items.length"
      :error="error"
    />

    <BgmList
      v-if="items.length"
      :items="items"
    />
  </section>
</template>
