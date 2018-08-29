<template>
  <div class="search">
    <input
      class="search--input"
      @keyup.enter="submit"
      v-model="keyword"
      type="text"
      placeholder="搜索"/>

    <span class="search--loading" v-show="loading">搜索中...</span>
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
    height: 30px;
    border-radius: 100px;
    border: 1px solid #e2e5e8;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 10px;
    overflow: hidden;
    position: relative;
  }

  .search--input
  {
    width: 100%;
    outline: 0;
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 14px;
  }

  .search--loading
  {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, .92);
    text-align: center;
  }

</style>
