<template>
  <nav
    class="menu"
    v-if="menu"
    :class="{show: isMenuActivated}">

    <span
      class="menu--icon"
      @click="toggleMenuList">
      <span></span>
    </span>

    <div class="menu--list">
      <template v-for="(item, index) in menu">
        <a
          v-if="item.url"
          :href="item.url"
          :key="index"
          class="menu--item">
          <i
            aria-hidden="true"
            :class="`fa fa-${item.icon}`"></i>
        </a>

        <nuxt-link
          v-else
          :title="item.title"
          :to="item.route || item.url"
          :class="`menu--item menu--${item.classname} ${active === item.classname ? 'active' : ''}`"
          :key="index">
          <span>{{ item.title }}</span>
        </nuxt-link>
      </template>
    </div>

  </nav>
</template>

<script>
  export default {
    name: 'HeaderNav',

    data () {
      const share = {
        title: '番组放送——版权动画播放地址聚合站',
        url: 'https://bangu.me/'
      }

      return {
        menu: [
          { title: '收藏', classname: 'favorite', route: '/favorite' },
          { title: '搜索', classname: 'search', route: '/search' },
          { title: '归档', classname: 'archives', route: '/archives' },
          { title: '关于', classname: 'about', route: '/about' },
          {
            title: 'Github',
            classname: 'github',
            url: 'https://github.com/alanoy/bangumi',
            icon: 'github-square'
          },
          {
            title: 'Twitter',
            classname: 'twitter',
            url: `https://twitter.com/share?url=${share.url}&text=${share.title}`,
            icon: 'twitter-square'
          },
          {
            title: 'Weibo',
            classname: 'Weibo',
            url: `http://service.weibo.com/share/share.php?title=${share.title}&url=${share.url}`,
            icon: 'weibo'
          }
        ],
        active: this.$route.name,
        isMenuActivated: false
      }
    },

    methods: {
      toggleMenuList () {
        this.isMenuActivated = !this.isMenuActivated
      }
    },

    watch: {
      '$route.name' (nVal) {
        this.active = nVal
      }
    },
  }
</script>

<style scoped>
  .menu
  {
    float: right;
  }

  .menu--icon
  {
    display: none;
  }

  .menu--item
  {
    margin-left: 15px;
    font-size: .9em;
    color: #bbbfc6;
    transition: all .15s ease;
  }

  .menu--item:hover {
    color: #969da6;
  }

  .menu--item .fa
  {
    font-size: 1.3em;
    vertical-align: middle;
  }

  .menu--item.active
  {
    color: #969da6;
    cursor: default;
  }

  .menu--item.active:hover
  {
    border-bottom-color: transparent;
  }

  .menu--icon
  {
    position: absolute;
    height: 32px;
    width: 32px;
    right: 10px;
    top: 50%;
    margin-top: -16px;
  }

  .menu--icon span,
  .menu--icon:before,
  .menu--icon:after
  {
    content: "";
    position: absolute;
    left: 5px;
    right: 5px;
    height: 2px;
    background-color: #7f8c8d;

    -webkit-transition: all .15s linear;
    -moz-transition: all .15s linear ;
    -ms-transition: all .15s linear ;
    -o-transition: all .15s linear ;
    transition: all .15s linear ;
  }

  .menu--icon span
  {
    top: 50%;
    margin-top: -1px;
  }

  .menu--icon:before
  {
    top: 8px;
  }

  .menu--icon:after
  {
    bottom: 8px;
  }

  .menu--list
  {
    display: block;
  }

  .menu--search
  {
    display: none;
  }

  @media screen and (max-width: 39.9375em) {

    .menu--search
    {
      display: inline;
    }

    .menu--icon
    {
      display: block;
    }

    .menu.show .menu--icon span
    {
      display: none;
    }

    .menu.show .menu--icon:before
    {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
      top: 50%;
      margin-top: -1px;
    }

    .menu.show .menu--icon:after
    {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      top: 50%;
      margin-top: -1px;
    }

    .menu--list
    {
      position: absolute;
      right: 10px;
      top: 52px;
      float: none;
      background-color: #dee6ea;
      z-index: 20;
      box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
      -webkit-transform: translate3d(120%, 0, 0);
      -moz-transform: translate3d(120%, 0, 0);
      -ms-transform: translate3d(120%, 0, 0);
      -o-transform: translate3d(120%, 0, 0);
      transform: translate3d(120%, 0, 0);

      -webkit-transition: all .15s ease;
      -moz-transition:  all .15s ease;
      -ms-transition:  all .15s ease;
      -o-transition:  all .15s ease;
      transition:  all .15s ease;
    }

    .menu.show .menu--list
    {
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      -o-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    .menu--item
    {
      display: block;
      margin: 10px 0;
      padding-left: 20px;
      padding-right: 20px;
      text-align: center;
      line-height: 2.5;
      box-sizing: border-box;
      color: #404040;
    }

  }
</style>