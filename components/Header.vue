<template>
  <header class="header">
    <div class="container">

      <nuxt-link
        to="/"
        title="番组放送"
        class="title">
        <h1>{{ title }}</h1>
      </nuxt-link>

      <header-nav />

    </div>
  </header>
</template>

<script>
  import HeaderNav from '~/components/HeaderNav'

  export default {
    name: 'Header',

    components: {
      HeaderNav
    },

    data () {
      return {
        title: '番组放送'
      }
    }
  }
</script>

<style scoped>
  .header
  {
    height: 52px;
    line-height: 52px;
    margin: 20px 0;
    position: relative;
  }

  .title h1
  {
    margin: 0;
    font-size: 1.5em;
    font-weight: 500;
    display: inline-block;
    position: relative;
    transition: all .3s ease;
  }

</style>