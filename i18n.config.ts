export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    'zh-cn': {
      archives: '归档',
      about: '关于',
      search: '搜索',
      login: '登录',
      logout: '登出',
      'no-result': '暂无数据',

      onAir: {
        title: '每日放送',
        ongoing: '放送中',
        ended: '已结束',
        date: '开播',
      },

      ranking: '排行',
      votes: '票',
      year: '年',
      month: '月',

      total: {
        subjects: '番数',
        episodes: '集数',
      },

      sources: {
        label: '资源',
        data: '数据来源',
      },

      pagination: '分页',
      collections: {
        title: '收藏',
        type: {
          1: '想看',
          2: '看过',
          3: '在看',
          4: '搁置',
          5: '抛弃',
        },
      },
    },
    en: {
      archives: 'Archives',
      about: 'About',
      search: 'Search',
      login: 'Login',
      logout: 'Logout',
      'no-result': 'No Result',

      onAir: {
        title: 'On Air',
        ongoing: 'On Air',
        ended: 'Ended',
        date: 'On Air',
      },

      ranking: 'Ranking',
      votes: 'Votes',
      year: 'Year',
      month: 'Month',

      total: {
        subjects: 'Subjects',
        episodes: 'Episodes',
      },

      sources: {
        label: 'Sources',
        data: 'Data Sources',
      },

      pagination: 'Pagination',
      collections: {
        title: 'Collections',
        type: {
          1: 'Wish',
          2: 'Watched',
          3: 'Watching',
          4: 'Stalled',
          5: 'Abandoned',
        },
      },
    },
  },
}))
