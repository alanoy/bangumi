import { useH3Session } from '@/composables/useSession'

export default defineEventHandler(async event => {
  const { clearSession } = useH3Session()
  await clearSession(event)

  return { message: 'success' }
})
