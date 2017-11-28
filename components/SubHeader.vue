<template>
  <div class="sub">
    <h2 class="sub--title">{{ year }} 年 {{ quarterly }} 月番组（共 {{ total }} 部）</h2>
    <search></search>
  </div>
</template>

<script>
  import Search from './Search'

  export default {
    name: 'SubHeader',

    components: { Search },

    props: {
      year: [Number, String],
      quarterly: [Number, String],
      total: Number
    }
  }
</script>

<style scoped>
  .sub
  {
    margin: 0 10px;
    position: relative;
  }

  .sub--title
  {
    margin-bottom: -10px;
  }

  .archive .sub--title
  {
    margin-bottom: 0;
  }

  .search
  {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -15px;
    width: 180px;
  }


  @media screen and (max-width: 39.9375em) {

    .search
    {
      margin-top: 15px;
      width: 60%;
      position: static;
    }

  }
</style>
