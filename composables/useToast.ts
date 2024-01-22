export const useToast = () => {
  const toasts = useState<Record<number, ToastItem>>(() => ({}))
  const timeoutList = useState<Record<number, any>>(() => ({}))

  function updateToast(item: ToastItem) {
    if (!item.timeout) item.timeout = 3000
    const timestamp = Date.now()

    toasts.value[timestamp] = item
    timeoutList.value[timestamp] = setTimeout(() => {
      delete toasts.value[timestamp]
      delete timeoutList.value[timestamp]
    }, item.timeout)
  }

  function clearToasts() {
    Object.keys(toasts.value).forEach(key => {
      const timestamp = Number(key)

      clearTimeout(timeoutList.value[timestamp])
      delete toasts.value[timestamp]
      delete timeoutList.value[timestamp]
    })
  }

  return {
    toasts,
    clearToasts,
    updateToast,
  }
}
