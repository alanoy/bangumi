<script lang="ts" setup>
const props = defineProps<{
  items: BgmItem[]
}>()

const list = computed(() => props.items.filter((item: BgmItem) => item.id))
</script>

<template>
  <div class="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <BgmItem
      v-for="(item, i) in list"
      :key="i"
      :item="item"
    />
  </div>
</template>
