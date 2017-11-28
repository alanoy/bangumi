<template>
  <div class="container">
    <div class="favorite" v-if="items">

      <div class="favorite--null" v-if="!items.length">
        你还未有任何收藏。
      </div>

      <div class="favorite--list" v-else>
        <h2 class="title">收藏</h2>
        <bangumi-list :items="items" :sites="sites"></bangumi-list>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import BangumiList from '~/components/List.vue'

  export default {
    name: 'Favorite',

    components: { BangumiList },

    data () {
      return {
        items: null,
        sites: null
      }
    },

    head () {
      return {
        title: '收藏 - 番组放送'
      }
    },

    mounted () {
      this.fetch()
    },

    methods: {
      async fetch () {
        const uri = '/api/fav'
        let ids = localStorage.getItem('favorite')

        if (ids) {
          ids = JSON.parse(ids).join(',')
          const { items, sites } = await axios.get(uri, { params: { ids } })
          this.items = items
          this.sites = sites
        } else {
          this.items = []
        }
      }
    }

  }
</script>

<style scoped>

  .favorite--null
  {
    margin: 20px 25px;
  }

  .favorite--list .title
  {
    margin: 15px 25px;
    font-size: 1.4em;
  }

</style>
