<script lang="ts" setup>
const props = defineProps<{
  id: string | undefined
  site: BgmSite
  meta: BgmMetaItem | null
}>()

const href = computed(() => {
  const { site, meta } = props

  if (!meta) return ''
  if (site.url) return site.url

  const url = meta.urlTemplate
  return url.replace('{{id}}', props.id)
})

const title = computed(() => {
  return props.meta?.title.trim() || ''
})
</script>

<template>
  <a
    v-if="meta"
    :href="href"
    target="_blank"
    class="link link-primary link-hover inline-block"
  >
    {{ title }}
  </a>
</template>
