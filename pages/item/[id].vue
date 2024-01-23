<script setup lang="ts">
import type { BgmtvSubject, BgmtvCollection } from '@/types/bgmtv'

const route = useRoute()
const { id } = route.params
const subject = ref<BgmtvSubject | null>(null)
const collection = ref<BgmtvCollection | null>(null)
const collectionType = ref<number | undefined>(undefined)

definePageMeta({
  middleware: ['is-expired'],
})

function handleData(data: { subject: BgmtvSubject; collection: BgmtvCollection }) {
  subject.value = data.subject
  collection.value = data.collection

  if (data.collection) {
    collectionType.value = data.collection.type
  }
}

function onRateSuccess(type: number) {
  collectionType.value = type
}

const { data } = await useFetch(`/api/subject/${id}`)

if (data.value) {
  handleData(data.value as { subject: BgmtvSubject; collection: BgmtvCollection })
}
</script>

<template>
  <ClientOnly>
    <section
      v-if="subject"
      class="relative"
    >
      <div class="grid grid-cols-8 gap-5 static md:absolute top-0 left-0 right-0 p-5">
        <div class="lg:col-span-2 col-span-3">
          <SubjectCover
            class="w-full"
            :images="subject.images"
          />
        </div>

        <div
          class="flex flex-auto lg:justify-start justify-between flex-col lg:col-span-2 lg:col-start-7 md:col-start-1 md:col-span-3 col-span-5"
        >
          <div>
            <h2 class="text-xl font-medium">{{ subject.name_cn || subject.name }}</h2>
            <p class="text-gray-500">{{ subject.date }}</p>
            <SubjectRating
              :id="subject.id"
              :rating="subject.rating"
              class="-ml-6"
              @rate-success="onRateSuccess"
            />
          </div>

          <BgmCollection
            :item="subject"
            :type="collectionType"
            show-text
            dropdown-align="start"
          />
        </div>
      </div>

      <div class="grid grid-cols-8 gap-5 p-5">
        <article
          class="lg:col-span-4 lg:col-start-3 md:col-span-5 md:col-start-4 col-span-8 col-start-1"
        >
          <template v-if="subject.summary">
            <p>{{ subject.summary }} </p>
            <div class="divider"></div>
          </template>

          <SubjectInfo
            label="类型"
            :value="subject.platform"
          />

          <SubjectInfo
            v-for="(info, i) in subject.infobox"
            :key="i"
            :label="info.key"
            :value="info.value"
          />
        </article>
      </div>
    </section>
  </ClientOnly>
</template>
