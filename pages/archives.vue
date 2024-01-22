<script lang="ts" setup>
const i18n = useI18n()
const { yearToLocaleString, quarterToLocaleString } = useDate()

useHead({
  title: i18n.t('archives'),
})

definePageMeta({
  keepAlive: true,
})

const items = ref<ArchiveItem[]>([])
const { data } = await useFetch('/api/archives')

if (data.value) {
  items.value = (data.value as { items: ArchiveItem[] }).items
}
</script>

<template>
  <section>
    <div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="card card-side bg-base-100 shadow-lg dark:shadow-xl dark:bg-base-300"
      >
        <div class="card-body">
          <h3 class="card-title">{{ yearToLocaleString(item.year) }}</h3>
          <ol>
            <li
              v-for="(len, m) in item.items"
              :key="m"
              class="whitespace-nowrap py-1"
            >
              <NuxtLink
                :to="`/archive/${item.year}-${m}`"
                :title="quarterToLocaleString(item.year, Number(m))"
                class="link link-hover link-primary"
              >
                {{ quarterToLocaleString(item.year, Number(m)) }} ({{ len }})
              </NuxtLink>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
