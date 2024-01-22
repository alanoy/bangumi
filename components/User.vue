<script setup lang="ts">
const { public: config } = useRuntimeConfig()
const router = useRouter()
const { isLogin, logout } = useBgmtv()
const { t } = useI18n()
const buttonText = computed(() => {
  if (!isLogin.value) {
    return t('login')
  }

  return t('logout')
})

const props = withDefaults(
  defineProps<{
    classList?: string
    showIcon?: boolean
    buttonClass?: string
  }>(),
  {
    classList: '',
    showIcon: true,
    buttonClass: '',
  },
)

const buttonClassList = computed(() => {
  let classList = 'btn btn-ghost btn-sm'

  if (isLogin.value) {
    classList += ' text-success'
  } else {
    classList += ' text-gray-400 hover:text-base-content'
  }

  classList += ' ' + props.buttonClass
  return classList
})

function authorize() {
  if (isLogin.value) {
    logout()
  } else {
    router.push('/auth/bgmtv')
  }
}
</script>

<template>
  <ClientOnly>
    <div
      v-if="config.isBgmtvAuthorize"
      :class="classList"
    >
      <button
        :class="buttonClassList"
        @click="authorize"
      >
        <svg
          v-if="showIcon"
          class="w-[16px] h-[16px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
          />
        </svg>
        {{ buttonText }}
      </button>
    </div>
  </ClientOnly>
</template>
