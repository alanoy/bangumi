<script lang="ts" setup>
const props = defineProps<{
  item: BgmItem
}>()

const week = useWeek()
const { metas } = useMetas()
const { isLogin } = useBgmtv()
const info = reactive<BgmMeta>({})
const onair = reactive<BgmMeta>({})
const resource = reactive<BgmMeta>({})
const { locale } = useI18n()

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
  const { item } = props
  const date = new Date(item.air_date || item.begin || '')
  return week.value[date.getDay() + 1]
})

const name = computed(() => {
  const { title, titleTranslate, name_cn: nameCN, name } = props.item
  let result = ''

  if (locale.value === 'zh-cn') {
    result = nameCN

    if (!result && titleTranslate && titleTranslate['zh-Hans']) {
      const titleArray = titleTranslate['zh-Hans']
      result = titleArray[0]
    }
  }

  if (!result) result = name || title || ''
  return result
})

const route = useRoute()
const showCollection = computed(() => {
  const { id, title, titleTranslate, collection_type } = props.item
  const isCollections = route.path === '/collections'

  if (isLogin.value && !isCollections) {
    return false
  }

  if (collection_type) {
    return true
  }

  return id && title && titleTranslate
})

const isTooltip = ref(false)

function onHoverTitle(e: Event) {
  const target = e.target as HTMLElement
  isTooltip.value = target.scrollHeight > target.clientHeight
}
</script>

<template>
  <div
    :key="item.id"
    class="card card-side bg-base-100 shadow-lg dark:shadow-xl dark:bg-base-300 relative"
  >
    <BgmCover :item="item" />

    <div class="card-body p-3">
      <div
        class="text-left"
        :class="{
          tooltip: isTooltip,
        }"
        :data-tip="name"
      >
        <h3
          class="card-title text-base font-normal line-clamp-2"
          :class="{
            'mr-8': isLogin,
          }"
          @mouseover="onHoverTitle"
        >
          {{ name }}
        </h3>
      </div>

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
        <span class="flex-none whitespace-nowrap">{{ $t('onAir.date') }}:</span>
        <span class="flex-auto ml-2">
          {{ item.air_date || (item.begin && item.begin.split('T')[0]) || '-' }}
        </span>
      </p>

      <div class="card-actions justify-between items-center">
        <BgmBadge :item="item" />
        <BgmCollection
          v-if="showCollection"
          :type="item.collection_type"
          :item="item"
        />
      </div>
    </div>

    <NuxtLink
      v-if="isLogin"
      :to="`/item/${item.id}`"
      class="btn btn-xs btn-square btn-outline absolute top-3 right-2"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
        />
      </svg>
    </NuxtLink>
  </div>
</template>
