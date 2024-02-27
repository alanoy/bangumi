<script lang="ts" setup>
import BluredColorfulText from '../BluredColorfulText.vue'

const { appTitle } = useRuntimeConfig().public
const route = useRoute()
const active = ref(route.name)

watch(
  () => route.name,
  val => (active.value = val),
)
</script>

<template>
  <nav class="navbar sticky top-0 z-50 bg-base-100 px-3 sm:px-5 shadow-sm">
    <div class="navbar-start">
      <LayoutMenus is-dropdown />
      <NuxtLink
        class="text-primary hover:text-primary/80 text-2xl font-bold"
        to="/"
        :title="appTitle"
      >
        <!-- <h1>{{ appTitle }}</h1> -->
        <BluredColorfulText :text="appTitle" />
      </NuxtLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <LayoutMenus />
    </div>

    <div class="navbar-end">
      <ColorScheme />
      <div class="md:inline-block hidden">
        <User />
      </div>
      <Search class="ml-2" />
    </div>
  </nav>
</template>
