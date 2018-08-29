<template>
  <div class="search input input-with-icon full-width">
    <input
      class="search--input"
      @keyup.enter="submit"
      v-model="keyword"
      type="text"
      placeholder="搜索"/>

    <i
      v-if="loading"
      class="input-icon fa fa-cog fa-spin"></i>
    <button
      v-else
      @click="submit"
      class="input-icon fa fa-search fa-lg"></button>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    name: 'Search',

    data () {
      const { query } = this.$route
      let keyword = query.keyword || ''

      return {
        keyword,
        loading: false
      }
    },

    methods: {
      redirect () {
        this.$router.push(`/search?keyword=${this.keyword}`)
      },

      submit () {
        const { keyword } = this
        if (!keyword) return false

        if (this.$route.path !== '/search') {
          this.redirect()
          return false
        }

        this.loading = true
        this.$router.push({
          query: { keyword }
        })

        axios
          .get(`/api/data?keyword=${encodeURI(keyword)}`)
          .then(res => {
            this.$emit('search', res.data)
          })
          .catch(e => { })
          .then(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style>

  .search
  {
    position: relative;
  }

  .search input {
    height: 38px;
    line-height: 38px;
  }

</style>
