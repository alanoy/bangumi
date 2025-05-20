<script lang="ts" setup>
const colorMode = useColorMode()
const appConfig = useAppConfig()

function onChangeTheme(name: string) {
  if (colorMode.value === name) return
  colorMode.preference = name
}
</script>

<template>
  <div class="dropdown">
    <div
      class="btn btn-ghost btn-sm"
      role="button"
      tabindex="0"
    >
      <svg
        class="w-[16px] h-[16px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 21 21"
      >
        <path
          d="M20.817 9.085a10 10 0 0 0-19.77 2.9A10.108 10.108 0 0 0 6.762 20a9.689 9.689 0 0 0 4.2 1h.012a3.011 3.011 0 0 0 2.144-.884A2.968 2.968 0 0 0 14 18v-.86A1.041 1.041 0 0 1 15 16h2.7a2.976 2.976 0 0 0 2.838-2.024 9.93 9.93 0 0 0 .279-4.891ZM5.5 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2.707-3.793a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414Zm2.872-1.624a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4.128 1.624a1 1 0 1 1-1.414-1.413 1 1 0 0 1 1.414 1.413Z"
        />
      </svg>
    </div>
    <ClientOnly>
      <ul
        class="dropdown-content z-1 p-2 shadow-2xl bg-base-200 rounded-box w-auto mt-3"
        tabindex="0"
      >
        <li
          v-for="theme in appConfig.themes"
          :key="theme"
        >
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            :aria-label="theme"
            :value="theme"
            :checked="theme === colorMode.preference"
            @change="onChangeTheme(theme)"
          />
        </li>
      </ul>
    </ClientOnly>
  </div>
</template>
