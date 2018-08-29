<template>
  <div class="container">
    <div class="search-result" v-if="items">

      <div class="search-result--head">
        <h2 class="search-result--title">搜索结果</h2>
        <search v-on:search="search"></search>
      </div>

      <div class="search-result--null" v-if="!items.length">
        未搜索到任何结果。
      </div>

      <div class="search-result--list" v-else>
        <bangumi-list
          type="search"
          :items="items"
          :sites="siteItems"></bangumi-list>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import BangumiList from '~/components/List.vue'
  import Search from '~/components/Search.vue'

  export default {
    name: 'SearchResult',

    components: { BangumiList, Search },

    async asyncData ({ query }) {
      let { keyword } = query
      let items = []
      let siteItems = {}

      if (keyword) {
        keyword = encodeURI(keyword)
        const { data, sites } = await axios.get(`/api/data?keyword=${keyword}`)

        items = data
        siteItems = sites
      }

      return {
        items,
        siteItems
      }
    },

    head () {
      return {
        title: '搜索 - 番组放送'
      }
    },

    methods: {
      search (items) {
        this.items = items
      }
    }

  }
</script>

<style scoped>

  .search-result--null
  {
    margin: 20px 25px;
  }

  .search-result--head {
    position: relative;
  }

  .search-result--title
  {
    position: absolute;
    left: 16px;
    top: 1px;
    line-height: 38px;
    z-index: 2;
    background-color: #f2f2f2;
    border-radius: 100px 0 0 100px;
    padding: 0 15px;
    font-size: .9em;
    margin: 0;
  }

  .search
  {
    margin: 20px 15px 15px;
    height: 40px;
    padding-top: 5px;
    padding-left: 100px;
  }

</style>
