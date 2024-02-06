import { inject } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  if (import.meta.env.VITE_VERCEL_ANALYTICS === 'true') {
    inject()
  }
})
