<script lang="ts" setup>
const props = defineProps<{
  year: number
  quarterly?: number
  total: number
  currentWeekday?: number
  sortBy?: string
  sortOptions?: { value: string; label: string }[]
}>()

const emits = defineEmits(['filter', 'update:sortBy'])
const route = useRoute()
const router = useRouter()
const week = useWeek()
const isArchive = computed(() => route.path.includes('/archive'))
const activeWeekday = ref<number>(props.currentWeekday || 0)
const { quarterToLocaleString } = useDate()

function onChangeWeekday(index: number) {
  const elem = document.activeElement as HTMLElement
  elem?.blur()

  if (index === activeWeekday.value) return false
  activeWeekday.value = index
  emits('filter', index)
  router.replace({
    query: { weekday: index },
  })
}
</script>
<template>
  <nav class="flex items-center mb-6">
    <h2
      v-if="year"
      class="text-lg font-medium"
    >
      <template v-if="quarterly">{{ quarterToLocaleString(year, quarterly) }}</template>
      <template v-else>{{ $t('onAir.title') }}</template>
      <span class="badge badge-ghost badge-sm ml-2">{{ $t('total.subjects') }} {{ total }}</span>
    </h2>

    <div
      v-if="!isArchive"
      class="dropdown dropdown-end"
    >
      <div
        tabindex="0"
        role="button"
        class="btn btn-sm btn-primary btn-outline ml-5"
        aria-role="list"
      >
        {{ week[activeWeekday] }}
        <svg
          width="12px"
          height="12px"
          class="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 dark:bg-base-300 rounded-box w-22"
      >
        <li
          v-for="(item, index) in week"
          :key="index"
          :value="index"
          aria-role="listitem"
          @click="onChangeWeekday(index)"
        >
          <a>{{ item }}</a>
        </li>
      </ul>
    </div>

    <select
      v-if="isArchive && sortBy !== undefined && sortOptions?.length"
      :value="sortBy"
      class="select select-sm select-bordered ml-5"
      @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="option in sortOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ $t(option.label) }}
      </option>
    </select>
  </nav>
</template>
