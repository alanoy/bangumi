export const useDate = () => {
  const { t, locale } = useI18n()

  function yearToLocaleString(year: number | string) {
    if (locale.value === 'zh-cn') {
      return `${year}${t('year')}`
    }

    return `${t('year')} ${year}`
  }

  function getQuarter(month: number) {
    return {
      1: 1,
      4: 2,
      7: 3,
      10: 4,
    }[month]
  }

  function quarterToLocaleString(year: number | string, month: number) {
    if (locale.value === 'zh-cn') {
      return `${year} ${t('year')} ${month} ${t('month')}番`
    }

    return `${year} Q${getQuarter(month)}`
  }

  return {
    yearToLocaleString,
    quarterToLocaleString,
  }
}
