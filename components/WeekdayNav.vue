<template>
  <nav class="tabs nav">
    <a
      href="javascript:;"
      :key="index"
      class="tab"
      :class="{ active: active == index }"
      @click="filter(index)"
      v-for="(item, index) in week">
      <span>{{ item }}</span>
    </a>
  </nav>
</template>

<script>
  export default {
    name: 'Nav',

    data () {
      return {
        week: ['全部', '周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        active: (new Date().getDay()) + 1
      }
    },

    methods: {
      filter (index) {
        if (index === this.active) return false

        this.active = index
        this.$emit('filter', index)
      }
    }
  }
</script>

<style scoped>
  .nav
  {
    height: 48px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .nav a
  {
    display: block;
    line-height: 48px;
    height: 48px;
    text-align: center;
    flex: 1;
    margin-right: 0;
    min-width: auto;
  }

</style>