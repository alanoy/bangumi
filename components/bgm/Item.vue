<script lang="ts" setup>
const props = defineProps<{
  item: BgmItem
}>()

const { metas } = useMetas()
const info = reactive<BgmMeta>({})
const onair = reactive<BgmMeta>({})
const resource = reactive<BgmMeta>({})
const isFavorite = ref(false)

Object.keys(metas.value).forEach(key => {
  const item = metas.value[key]

  if (item.type === 'resource') {
    resource[key] = item
  } else if (item.type === 'info') {
    info[key] = item
  } else if (item.type === 'onair') {
    onair[key] = item
  }
})

const weekday = computed(() => {
  const week = useWeek()
  const { item } = props
  const date = new Date(item.air_date || item.begin || '')
  return week.value[date.getDay() + 1]
})

const name = computed(() => {
  const { title, titleTranslate, name_cn: nameCN, name } = props.item

  if (titleTranslate && titleTranslate['zh-Hans']) {
    const titleArray = titleTranslate['zh-Hans']
    return titleArray[0]
  }

  return title || nameCN || name || ''
})

const showFavorite = computed(() => {
  const { id, title, titleTranslate } = props.item
  return id && title && titleTranslate
})

function addFavorite(item: BgmItem) {
  const favItems = useFavorite()
  const index = favItems.findIndex(_ => _.id === item.id)

  if (index > -1) {
    favItems.splice(index, 1)
  } else {
    favItems.push(item)
  }

  localStorage.setItem('favorite', JSON.stringify(favItems))
}

function setFavorite() {
  const favItems = useFavorite()

  if (favItems?.length) {
    isFavorite.value = favItems.findIndex(_ => _.id === props.item.id) > -1
  }
}

if (process.client) {
  setFavorite()
}
</script>

<template>
  <div class="card card-side bg-base-100 shadow-lg dark:shadow-xl dark:bg-base-300 item">
    <BgmCover :item="item" />

    <div class="card-body p-3">
      <h3 class="card-title text-base font-normal flex-auto">{{ name }}</h3>

      <p
        v-if="item.sites && item.sites.length > 1"
        class="text-sm text-gray-500 flex"
      >
        <span class="flex-none whitespace-nowrap">{{ weekday }}:</span>
        <span class="flex-auto">
          <BgmPlayLink
            v-for="opt in item.sites"
            :id="opt.id"
            :key="opt.id"
            :site="opt"
            :meta="onair[opt.site]"
            class="ml-2"
          />
        </span>
      </p>

      <BgmSourceList
        :id="item.id"
        :name="name"
        :resource="resource"
        :info="info"
        :official="item.officialSite"
      />

      <p class="text-sm text-gray-500 flex">
        <span class="flex-none whitespace-nowrap">开播:</span>
        <span class="flex-auto ml-2">
          {{ item.air_date || (item.begin && item.begin.split('T')[0]) || '-' }}
        </span>
      </p>

      <div class="card-actions justify-between items-center">
        <BgmBadge :item="item" />
        <ClientOnly v-if="showFavorite">
          <label class="swap swap-flip">
            <input
              v-model="isFavorite"
              type="checkbox"
              @change="addFavorite(item)"
            />

            <svg
              class="swap-off w-[20px] h-[20px] text-gray-400 dark:text-white/[0.6]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 19"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
              />
            </svg>

            <svg
              class="swap-on w-[20px] h-[20px] text-error"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"
              />
            </svg>
          </label>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
