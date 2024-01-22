<script setup lang="ts">
import type { BgmtvSubject, BgmtvCollection } from '@/types/bgmtv'

const route = useRoute()
const { id } = route.params
const subject = ref<BgmtvSubject | null>(null)
const collection = ref<BgmtvCollection | null>(null)

definePageMeta({
  middleware: ['is-expired'],
})

function handleData(data: { subject: BgmtvSubject; collection: BgmtvCollection }) {
  subject.value = data.subject
  collection.value = data.collection
}

const { data } = await useFetch(`/api/subject/${id}`)

if (data.value) {
  handleData(data.value as { subject: BgmtvSubject; collection: BgmtvCollection })
}
</script>

<template>
  <section
    v-if="subject"
    class="relative"
  >
    <div class="grid grid-cols-8 gap-5 static md:absolute top-5 left-5 right-5 mb-5">
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
          />
        </div>

        <BgmCollection
          :item="subject"
          :type="collection?.type"
          show-text
          dropdown-align="start"
        />
      </div>
    </div>

    <div class="grid grid-cols-8 gap-5">
      <article
        class="lg:col-span-4 lg:col-start-3 md:col-span-5 md:col-start-4 col-span-8 col-start-1"
      >
        <p>{{ subject.summary }} </p>

        <div class="divider"></div>

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
    <!-- <div class="col-span-2 hidden lg:block"> -->
    <!--   <SubjectRating -->
    <!--     :id="subject.id" -->
    <!--     :rating="subject.rating" -->
    <!--     class="w-full" -->
    <!--   /> -->

    <!--   <div class="md:px-6"> -->
    <!--     <BgmCollection -->
    <!--       :item="subject" -->
    <!--       :type="collection?.type" -->
    <!--       show-text -->
    <!--       dropdown-align="start" -->
    <!--     /> -->
    <!--   </div> -->
    <!-- </div> -->
  </section>
</template>