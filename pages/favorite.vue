<template>
  <div class="container">
    <div
      class="favorite"
      v-if="items">

      <div
        class="text-gray favorite--null"
        v-if="items && !items.length">
        你还未有任何收藏。
      </div>

      <div class="favorite--list" v-else>
        <h2 class="text-gray title">收藏</h2>
        <bangumi-list
          :items="items"
          :sites="sites" />
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
        let ids = localStorage.getItem('favorite') || []
        ids = JSON.parse(ids).join(',')

        if (ids) {
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
    margin: 20px 0;
    font-size: 1.4em;
  }

  .favorite--list .title
  {
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 1.4em;
    border-bottom: 1px solid #465f78;
  }

</style>
