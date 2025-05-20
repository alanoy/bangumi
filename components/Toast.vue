<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <div class="toast toast-top toast-center z-99999">
    <div
      v-for="(toast, prop) in toasts"
      :key="prop"
      class="alert"
      :class="`alert-${toast.type}`"
    >
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>
