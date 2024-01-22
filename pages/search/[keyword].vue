<script lang="ts" setup>
const route = useRoute()
const items = ref<BgmItem[]>([])
const keyword = ref<string>('')
const { t } = useI18n()

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
    items.value = data.items
  },
)

if (route.params.keyword) {
  keyword.value = route.params.keyword as string
}
</script>

<template>
  <section>
    <h3
      v-show="!pending && !items.length"
      class="text-2xl p-5 text-neutral-500"
    >
      {{ $t('no-result') }}
    </h3>

    <BgmList
      v-if="items.length"
      :items="items"
    />
  </section>
</template>
