<script lang="ts" setup>
const i18n = useI18n()
const { isLogin } = useBgmtv()
const { getLocalCollections, getLocalIds } = useCollections()

useHead({
  title: i18n.t('collections.title'),
})

definePageMeta({
  keepAlive: true,
  middleware: ['is-expired'],
})

const list = ref<BgmItem[]>([])
const total = ref(0)
const offset = ref(0)
const limit = 20
const localIds = ref('')
const pending = ref(false)
const error = ref<IError | undefined>(undefined)

async function getBgmtvCollections() {
  pending.value = true
  const { data } = await useFetch('/api/collections/list', {
    params: { limit, offset: offset.value },
  })

  pending.value = false
  if (data.value) {
    const collections = data.value as { items?: BgmItem[]; total?: number; error: IError }

    if (collections?.items) {
      list.value = collections.items
      total.value = collections.total || 0
    }
  }
}

if (isLogin.value) {
  // use bgm.tv collections
  await getBgmtvCollections()
} else {
  // use local collections
  const { pending: loading, data: favs } = await useAsyncData(
    'collections',
    () =>
      $fetch('/api/collections/local', {
        params: { ids: localIds.value },
      }),
    {
      immediate: false,
      watch: [localIds],
    },
  )

  watch(loading, (status: boolean) => {
    pending.value = status
  })

  watch(favs, (data: any) => {
    const { items } = data as { items: BgmItem[] }
    const localItems = getLocalCollections()

    list.value = items.map(item => {
      const bgmItem = localItems.find(_ => _.id === item.id)

      return {
        ...item,
        ...bgmItem,
        rating: null,
      }
    })
  })

  if (process.client) {
    // set ids to trigger data fetching
    localIds.value = getLocalIds()

    if (!localIds.value) {
      pending.value = false
    }
  }
}

async function onPageChange(page: number) {
  offset.value = (page - 1) * limit
  await getBgmtvCollections()
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <section>
    <NoResult
      v-show="!pending && !list.length"
      :error="error"
    />

    <BgmList
      v-if="list.length"
      :items="list"
    />

    <Pagination
      v-if="isLogin"
      :total="total"
      :limit="limit"
      :pending="pending"
      @change="onPageChange"
    />
  </section>
</template>
