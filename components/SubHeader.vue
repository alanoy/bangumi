<template>
  <div class="row sub">
    <h2 class="col-md-8 sub--title text-gray">{{ year }} 年 {{ quarterly }} 月番组（共 {{ total }} 部）</h2>
    <div class="col-md-4">
      <search />
    </div>
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

  .sub--title
  {
    line-height: 40px;
  }

</style>
