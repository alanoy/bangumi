<template>
  <section class="container">
    <div class="about">

      <p>版权动画播放地址聚合站</p>

      <p>
        数据来源：<a href="https://github.com/bangumi-data/bangumi-data.git">bangumi-data</a>
      </p>

      <p>
        图片来源：<a href="http://bangumi.tv/">番组计划</a>
      </p>

    </div>
  </section>
</template>

<script>
  export default {
    name: 'About',

    head () {
      return {
        title: '关于 - 番组放送'
      }
    }
  }
</script>

<style scoped>
  .about
  {
    margin: 30px 40px 40px;
  }
</style>
