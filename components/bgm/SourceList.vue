<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  resource: BgmMeta
  info: BgmMeta
  official?: string
}>()

const dmhy = computed(() => {
  const { dmhy } = props.resource
  return {
    link: dmhy.urlTemplate.replace('{{id}}', encodeURIComponent(props.name)),
    title: dmhy.title,
  }
})

const bgmLink = computed(() => {
  const { bangumi } = props.info
  return bangumi ? bangumi.urlTemplate.replace('{{id}}', `${props.id}`) : ''
})
</script>

<template>
  <p class="text-sm text-gray-500 flex">
    <span class="flex-none whitespace-nowrap">{{ $t('sources.label') }}:</span>
    <span class="flex-auto">
      <a
        :href="dmhy.link"
        :title="dmhy.title"
        target="_blank"
        class="link link-primary link-hover ml-2 inline-block"
      >
        {{ dmhy.title }}
      </a>

      <a
        v-if="id"
        title="番组计划"
        :href="bgmLink"
        target="_blank"
        class="link link-primary link-hover ml-2 inline-block"
      >
        番组计划
      </a>

      <a
        v-if="official"
        :href="official"
        title="官网"
        target="_blank"
        class="link link-primary link-hover ml-2 inline-block"
      >
        官网
      </a>
    </span>
  </p>
</template>
