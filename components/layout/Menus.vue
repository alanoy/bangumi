<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    isDropdown?: boolean
  }>(),
  {
    isDropdown: false,
  },
)

const { t } = useI18n()
const menus: NavbarMenu[] = [
  { title: t('collections.title'), route: '/collections' },
  { title: t('archives'), route: '/archives' },
  { title: t('about'), route: '/about' },
]

const classList = computed(() => {
  let parent = ''
  let ul = 'menu menu-horizontal px-1'
  let li = ''

  if (props.isDropdown) {
    parent = 'dropdown'
    ul =
      'menu menu-sm dropdown-content z-[1] p-2 shadow-xl bg-base-100 dark:bg-base-300 rounded-box w-32 flex-column'
    li = 'basis-full w-full'
  }

  ul += ' flex items-center'
  return { parent, ul, li }
})

function closeDropdown() {
  const elem = document.activeElement as HTMLElement
  elem?.blur()
}
</script>

<template>
  <div :class="classList.parent">
    <div
      v-if="isDropdown"
      tabindex="0"
      role="button"
      class="btn btn-ghost lg:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </div>
    <ul
      tabindex="0"
      :class="classList.ul"
    >
      <li
        v-for="menu in menus"
        :key="menu.title"
        :class="`${menu.classname} ${classList.li}`"
        @click="closeDropdown"
      >
        <NuxtLink
          :to="menu.route"
          no-rel
          class="py-2"
        >
          <svg
            v-if="menu.icon === 'twitter'"
            class="w-[16px] h-[16px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
            />
          </svg>
          <svg
            v-else-if="menu.icon === 'github'"
            class="w-[16px] h-[16px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clip-rule="evenodd"
            />
          </svg>
          <template v-else>{{ menu.title }}</template>
        </NuxtLink>
      </li>
      <li class="inline-flex md:hidden">
        <User
          class-list=""
          :show-icon="false"
          button-class="p-0 hover:bg-transparent"
        />
      </li>
    </ul>
  </div>
</template>
