<script setup lang="ts">
const emits = defineEmits<{
  (e: 'change', page: number): void
}>()

const props = withDefaults(
  defineProps<{
    total: number
    limit: number
    pending: boolean
  }>(),
  {
    pending: false,
  },
)

const currentPage = ref(1)
const length = computed(() => Math.ceil(props.total / props.limit))
const renderList = computed(() => {
  const total = length.value

  if (total < 9) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const p = currentPage.value
  const list: number[] = [1]

  if (p > 3) {
    list.push(0)
  }

  for (let i = p - 1; i <= p + 1; i++) {
    if (i > 1 && i < total) {
      list.push(i)
    }
  }

  if (p < total - 2) {
    list.push(0)
  }

  list.push(total)
  return list
})

function onChange(page: number) {
  currentPage.value = page
  emits('change', page)
}
</script>

<template>
  <div
    v-if="length > 1"
    class="pagination mt-8 mb-3 flex-auto flex items-center justify-center"
  >
    <div class="join">
      <button
        class="join-item btn btn-sm"
        :class="{ 'btn-disabled': currentPage === 1 }"
        @click="onChange(currentPage - 1)"
      >
        «
      </button>
      <button
        v-for="page in renderList"
        :key="page"
        class="join-item btn btn-sm"
        :class="{
          'btn-primary': currentPage === page,
          'btn-disabled': page === 0,
        }"
        @click="page && onChange(page)"
      >
        <span
          v-if="pending && currentPage === page"
          class="loading loading-ring loading-xs"
        />
        {{ page === 0 ? '...' : page }}
      </button>
      <button
        class="join-item btn btn-sm"
        :class="{ 'btn-disabled': currentPage === length }"
        @click="onChange(currentPage + 1)"
      >
        »
      </button>
    </div>
  </div>
</template>
