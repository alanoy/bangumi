<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const keyword = ref(route.params.keyword as string)

function onSearch() {
  if (!keyword.value) return false
  const path = `/search/${encodeURIComponent(keyword.value)}`

  if (route.path.includes('/search')) {
    router.replace(path)
  } else {
    router.push(path)
  }
}
</script>

<template>
  <form
    action=""
    @submit.prevent="onSearch"
  >
    <input
      v-model="keyword"
      type.native="search"
      placeholder="搜索"
      class="input input-bordered input-sm w-full max-w-xs"
    />
  </form>
</template>
