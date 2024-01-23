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
const { getTypeText, getLocalCollections, setLocalCollections, collecting, setBgmtvCollections } =
  useCollections()

const { isLogin } = useBgmtv()
const isCollected = ref(false)
const collectionType = ref<number | undefined>(props.type)

watch(
  () => props.type,
  val => {
    if (val) {
      isCollected.value = true
      collectionType.value = val
    }
  },
)

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
  <ClientOnly>
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

        <BgmCollectionStatusIcon :collection-type="collectionType" />
        <span
          class="inline-flex rounded-full z-[100] absolute bg-base-100 w-[24px] h-[24px] top-[-2px] left-[-2px] justify-center"
          :class="{
            hidden: !collecting,
          }"
        >
          <span
            class="loading loading-spinner loading-sm"
            :class="{
              'text-base-content': type === 1,
              'text-success': type === 2,
              'text-info': type === 3,
              'text-warning': type === 4,
              'text-gray-500': type === 5,
            }"
          />
        </span>
        <span
          v-if="showText"
          class="inline-flex leading-[20px] ml-7"
        >
          {{ getTypeText(collectionType) }}
        </span>
      </label>
      <ul
        v-if="isLogin"
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 dark:bag-base-300 rounded-box w-28 mt-1"
      >
        <li
          v-for="t in [1, 2, 3, 4, 5]"
          :key="t"
          @click="changeCollection(t)"
        >
          <a
            :class="{
              'bg-base-300': t === collectionType,
            }"
          >
            <BgmCollectionStatusIcon :collection-type="t" />
            {{ getTypeText(t) }}
          </a>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>
