<script setup lang="ts">
const { appTitle } = useRuntimeConfig().public
const { setMetas } = useMetas()
const { data } = await useFetch('/api/metas')

// set document title
useHead({
  titleTemplate: productCategory => {
    return productCategory ? `${productCategory} - ${appTitle}` : appTitle
  },
})

setMetas((data.value as { metas: BgmMeta })?.metas || {})
</script>

<template>
  <div class="flex flex-col min-h-full">
    <NuxtLoadingIndicator
      class="flex-none"
      :throttle="0"
      color="repeating-linear-gradient(to right,#da5597 0%,#9d59ef 50%,#6466e9 100%)"
    />
    <LayoutHeader class="flex-none" />
    <NuxtPage class="md:p-5 sm:p-3 p-3 flex-auto" />
    <LayoutFooter class="flex-none" />
    <Toast />
  </div>
</template>

<style>
#__nuxt {
  height: 100vh;
}
</style>
