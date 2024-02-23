import type { BgmtvAuthRequestBody, BgmtvAuthResponse } from '@/types/bgmtv'

export const useBgmtv = () => {
  const isLogin = useState(() => false)

  async function authorize(params: BgmtvAuthRequestBody) {
    params.state = Date.now()
    const res = await $fetch<{ message: string; data?: BgmtvAuthResponse }>('/api/authorize', {
      method: 'POST',
      body: params,
    })

    if (res.message === 'success') {
      setLogin(true)
    }

    return res
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
    logout,
    setLogin,
  }
}
