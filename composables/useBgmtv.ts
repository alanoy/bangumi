import type { BgmtvAuthRequestBody, BgmtvAuthResponse, BgmtvUser } from '@/types/bgmtv'

export const useBgmtv = () => {
  const isLogin = useState(() => false)
  const user = useState<BgmtvUser | null>(() => null)
  const userPending = ref(false)

  async function authorize(
    params: BgmtvAuthRequestBody,
  ): Promise<{ message: string; data?: BgmtvAuthResponse }> {
    const res = await $fetch('/api/authorize', {
      method: 'POST',
      body: params,
    })

    if (res.message === 'success') {
      setLogin(true)
    }

    return res
  }

  async function getUser(onSuccess: (user: BgmtvUser) => void) {
    if (!isLogin.value || user.value) {
      if (user.value) {
        onSuccess && onSuccess(user.value)
      }

      return
    }

    if (userPending.value) {
      return
    }

    userPending.value = true
    const { data } = (await $fetch('/api/user')) as { data?: BgmtvUser }

    userPending.value = false
    if (data) {
      user.value = data
      onSuccess && onSuccess(data)
    }
  }

  async function logout() {
    const { message } = await $fetch('/api/logout', {
      method: 'POST',
    })

    if (message === 'success') {
      setLogin(false)
      location.reload()
    }
  }

  function setLogin(value: boolean) {
    isLogin.value = value
  }

  return {
    isLogin,
    authorize,
    getUser,
    user,
    logout,
    setLogin,
  }
}
