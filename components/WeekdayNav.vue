<template>
  <nav class="nav">
    <a href="javascript:;"
       :key="index"
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
    background-color: #ecf0f1;
    border-bottom: 1px solid #bdc3c7;
    height: 42px;
    margin: 15px 10px;
    padding: 0 10px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .nav a
  {
    color: #7f8c8d;
    display: block;
    line-height: 42px;
    height: 42px;
    text-align: center;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .nav a:hover
  {
    border-bottom: 0;
  }

  .nav a:after
  {
    content: "";
    height: 2px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .nav .active
  {
    color: #e74c3c;
    position: relative;
  }

  .nav .active:after
  {
    background-color: #e74c3c;
  }
</style>