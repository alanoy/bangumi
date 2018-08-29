<template>
  <section class="container archive">

    <sub-header
      :total="items.length"
      :year="year"
      :quarterly="quarterly" />

    <bangumi-list
      :items="items"
      :sites="sites" />

  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import BangumiList from '~/components/List.vue'
  import SubHeader from '~/components/SubHeader.vue'

  export default {
    name: 'Archive',

    async asyncData ({ req, params }) {
      const { id } = params
      const uri = `/api/data?id=${id}`

      const idAry = id.split('-')
      let { data, sites } = await axios.get(uri)

      return {
        items: data,
        sites,
        year: idAry[0],
        quarterly: idAry[1]
      }
    },

    components: {
      BangumiList,
      SubHeader
    }
  }
</script>
