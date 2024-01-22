<script setup lang="ts">
import type { BgmtvSubject } from '@/types/bgmtv'

const props = withDefaults(
  defineProps<{
    item: BgmItem | BgmtvSubject
    type: number | undefined // collection type
    showText?: boolean
    dropdownAlign?: string
  }>(),
  {
    showText: false,
    dropdownAlign: 'end',
  },
)

const { updateToast } = useToast()
const {
  getTypeText,
  getStatus,
  getLocalCollections,
  setLocalCollections,
  collecting,
  setBgmtvCollections,
} = useCollections()

const { isLogin } = useBgmtv()
const isCollected = ref(false)
const collectionType = ref<number | undefined>(props.type)
const collectedStatus = computed(() => `text-${getStatus(collectionType.value)}`)

// for local collection only
function toggleCollection() {
  const { item } = props

  if (!isLogin.value) {
    setLocalCollections(item as BgmItem)
    isCollected.value = !isCollected.value
  }
}

// change bgm.tv collection type
async function changeCollection(type: number) {
  const elem = document.activeElement as HTMLElement
  elem?.blur()

  if (collecting.value || type === collectionType.value) {
    return
  }

  const { message } = (await setBgmtvCollections(props.item.id, { type })) as { message: string }

  if (message === 'success') {
    collectionType.value = type
  } else {
    updateToast({ message, type: 'error' })
  }
}

function setCollectionStatus() {
  const { type } = props
  const { id } = props.item
  const localItems = getLocalCollections()

  if (type) {
    isCollected.value = true
    return
  }

  if (localItems?.length) {
    isCollected.value = localItems.findIndex(_ => _.id === id) > -1
  }
}

if (process.client) {
  setCollectionStatus()
}
</script>

<template>
  <div
    class="inline-flex"
    :class="{
      'dropdown dropdown-bottom': isLogin,
      'dropdown-end': dropdownAlign === 'end',
      'dropdown-start': dropdownAlign === 'start',
    }"
  >
    <label
      tabindex="0"
      role="button"
      class="swap swap-flip relative"
      :class="{ 'swap-active': isCollected }"
      @click="toggleCollection"
    >
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
        class="swap-on w-[20px] h-[20px]"
        :class="collectedStatus"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path
          d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"
        />
      </svg>
      <span
        class="inline-flex rounded-full z-[100] absolute bg-base-100 w-[24px] h-[24px] top-[-2px] left-[-2px] justify-center"
        :class="{
          hidden: !collecting,
        }"
      >
        <span
          class="loading loading-spinner loading-sm"
          :class="`text-${getStatus(collectionType)}`"
        />
      </span>
      <span
        v-if="showText"
        class="inline-flex leading-[20px] ml-7"
      >
        {{ getTypeText(type) }}
      </span>
    </label>
    <ul
      v-if="isLogin"
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 dark:bag-base-300 rounded-box w-28 mt-1"
    >
      <li
        v-for="type in [1, 2, 3, 4, 5]"
        :key="type"
        @click="changeCollection(type)"
      >
        <a
          :class="{
            'bg-base-300': type === collectionType,
          }"
        >
          <svg
            class="swap-on w-[20px] h-[20px]"
            :class="`text-${getStatus(type)}`"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path
              d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"
            />
          </svg>
          {{ getTypeText(type) }}
        </a>
      </li>
    </ul>
  </div>
</template>
