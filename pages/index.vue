<template>
  <section class="container">

    <sub-header
      :total="origin.length"
      :year="year"
      :quarterly="quarterly" />

    <weekday-nav v-on:filter="filterByWeekday" />

    <bangumi-list
      :items="items"
      :sites="sites" />

  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import BangumiList from '~/components/List.vue'
  import WeekdayNav from '~/components/WeekdayNav.vue'
  import SubHeader from '~/components/SubHeader.vue'

  const filterByWeekday = (weekday, data) => {
    if (weekday === 0) return data

    weekday -= 1
    let res = []

    data.forEach((item) => {
      const { sites } = item
      let day

      if (sites[0] && sites[0].begin) {
        day = new Date(sites[0].begin).getDay()
      } else if (item.begin) {
        day = new Date(item.begin).getDay()
      }

      if (day === weekday) res.push(item)
    })

    return res
  }

  export default {
    async asyncData ({ params, error }) {
      const { sites, data } = await axios.get('/api/data')
      const date = new Date()
      const weekday = date.getDay() + 1
      const items = filterByWeekday(weekday, data)

      return {
        origin: data,
        items,
        sites,
        year: date.getFullYear(),
        quarterly: [1, 4, 7, 10][Math.floor(date.getMonth() / 3)]
      }
    },

    methods: {
      filterByWeekday (weekday) {
        this.items = filterByWeekday(weekday, this.origin)
      }
    },

    components: {
      BangumiList,
      WeekdayNav,
      SubHeader
    }
  }
</script>

