<script setup lang="ts">
const { t } = useI18n()
const { appTitle } = useRuntimeConfig().public

useHead({
  title: t('about'),
})
</script>

<template>
  <div class="p-5 leading-10">
    <p>
      {{ appTitle }} App by
      <a
        href="//ideapart.com/"
        title="ideapart"
        target="_blank"
        class="link link-secondary"
      >
        Alan
      </a>
    </p>
    <div class="mt-4">
      {{ $t('sources.data') }}:
      <ul class="ml-8 list-disc list-inside">
        <li>
          <a
            href="https://github.com/bangumi-data/bangumi-data.git"
            rel="noreferrer"
            class="link"
          >
            bangumi-data
          </a>
        </li>
        <li>
          <a
            href="http://bgm.tv/"
            rel="noreferrer"
            class="link"
          >
            bgm.tv
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
