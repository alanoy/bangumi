<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: number
    rating: BgmRating
    shadowless?: boolean
  }>(),
  {
    shadowless: true,
  },
)

const emits = defineEmits(['rate-success'])

const stars = computed(() => {
  const { score } = props.rating
  const list = []
  list.length = 10

  const full = Math.floor(score)
  const half = score - full >= 0.5 ? 1 : 0

  list[full + half] = true
  return list
})

const { updateToast } = useToast()
const { collecting, setBgmtvCollections, getType } = useCollections()

async function onChange(i: number) {
  const rate = i + 1
  // rating action will set collection type to 'WATCHED'
  const { message, error } = await setBgmtvCollections(props.id, { rate })

  if (message === 'success') {
    emits('rate-success', getType('WATCHED'))
  } else {
    updateToast({ message: error?.message || '', type: 'error' })
  }
}
</script>

<template>
  <div
    class="stats"
    :class="{
      'shadow-none': shadowless,
      'shadow-lg': !shadowless,
    }"
  >
    <div class="stat">
      <div class="stat-title">{{ $t('ranking') }} #{{ rating.rank }}</div>
      <div class="stat-value">
        <span class="text-accent">{{ rating.score.toFixed(1) }}</span>
        <span class="text-sm font-normal text-gray-500 ml-2">
          {{ rating.total }} {{ $t('votes') }}
        </span>
      </div>
      <div class="stat-desc">
        <div class="rating rating-md rating-half">
          <input
            v-for="(checked, i) in stars"
            :key="i"
            type="radio"
            name="rating-10"
            class="bg-accent mask mask-star-2"
            :class="{
              'mask-half-1': i % 2 === 0,
              'mask-half-2': i % 2 === 1,
            }"
            :disabled="collecting"
            :checked="checked"
            @change="onChange(i)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
