<template>
  <div :class="`bangumi-item bangumi-item__${type || 'normal'}`"
       :data-id="item.id">

    <div class="body">

      <h3 
        class="bangumi-item--title" 
        v-html="itemTitle"
        v-if="type !== 'search'"></h3>

      <div class="bangumi-item--title" v-else>
        <div class="title">
          <strong>{{ item.lang }}：</strong>
          <span class="title--list" v-html="item.title"></span>
        </div>

        <div
          class="title"
          :key="prop"
          v-for="(titles, prop) in item.titleTranslate">

          <strong>{{ prop }}：</strong>
          <span class="title--list">
            <span
              class="title--list-item"
              :key="index"
              v-for="(title, index) in titles">{{ title }}</span>
          </span>
        </div>
      </div>

      <p class="bangumi-item--broadcast meta">
        <span class="meta--title week">{{ weekday }}：</span>

        <span class="meta--content sites">
          <template v-for="(site, index) in item.sites">
            <site-link
              :key="index"
              :item="site"
              :sites="onair"></site-link>
          </template>
        </span>
      </p>

      <p class="meta">
        <span class="meta--item">
          <span class="meta--title">下载：</span>

          <span class="meta--content">
            <template v-for="(link, index) in resource">
              <download-link
                :key="index"
                :data="item"
                :title="itemTitle"
                :item="link"></download-link>
            </template>
          </span>
        </span>

        <span class="meta--item">
          <span class="meta--title">链接：</span>

          <span class="meta--content">
            <a :href="item.officialSite"
               v-if="item.officialSite"
               target="_blank">官网</a>
            <template v-for="(site, index) in item.sites">
              <site-link
                :key="index"
                :item="site"
                :sites="info"></site-link>
            </template>
          </span>
        </span>
      </p>

      <span class="bangumi-item--fav"
            :class="{faved: isFaved}"
            v-if="bgmId && (typeof isFaved === 'boolean')"
            @click="addFav(bgmId)">
        <i class="fa fa-heart" v-if="isFaved"></i>
        <i class="fa fa-heart-o" v-else></i>
      </span>

    </div>

  </div>
</template>

<script>
  import Cover from './Cover.vue'
  import SiteLink from './SiteLink.vue'
  import DownloadLink from './DownloadLink.vue'

  const formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  export default {
    name: 'ListItem',

    components: { SiteLink, DownloadLink, Cover },

    props: {
      item: Object,
      sites: Object,
      type: String
    },

    data () {
      let info = {}
      let onair = {}
      let resource = {}

      for (let prop in this.sites) {
        const item = this.sites[prop]

        if (item.type === 'resource') {
          resource[prop] =item
        } else if (item.type === 'info') {
          info[prop] = item
        } else if (item.type === 'onair') {
          onair[prop] = item
        }
      }

      return {
        info,
        onair,
        resource,
        isFaved: null
      }
    },

    computed: {
      weekday () {
        const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        const { begin, end, sites } = this.item
        let day

        if (end) return '已完结'

        if (sites[0] && sites[0].begin) {
          day = new Date(sites[0].begin)
          const hour = formatNumber(day.getHours())
          const minitues = formatNumber(day.getMinutes())

          return week[day.getDay()] + ` (${hour} : ${minitues})`
        } else {
          day = new Date(begin).getDay()
          return week[day] + ' (预计)'
        }
      },

      itemTitle () {
        const { title, titleTranslate } = this.item

        if (titleTranslate && titleTranslate['zh-Hans']) {
          const titleArray = titleTranslate['zh-Hans']
          return titleArray[ titleArray.length - 1 ]
        } else {
          return title
        }
      },

      bgmId () {
        const { sites } = this.item
        let id = ''

        sites.some((item) => {
          if (item.site === 'bangumi') id = item.id
        })

        return id
      }
    },

    mounted () {
      let favs = localStorage.getItem('favorite')

      if (favs) {
        favs = JSON.parse(favs)
        this.isFaved = favs.includes(this.bgmId)
      } else {
        this.isFaved = false
      }
    },

    methods: {
      addFav (id) {
        let favs = localStorage.getItem('favorite')

        if (favs) favs = JSON.parse(favs)
        else favs = []

        if (favs.includes(id)) {
          favs.splice(favs.indexOf(id), 1)
        } else {
          favs.push(id)
        }

        this.isFaved = !this.isFaved

        localStorage.setItem('favorite', JSON.stringify(favs))
      }
    }
  }
</script>

<style scoped>

  .bangumi-item
  {
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ecf0f1;
    border-bottom: 1px solid #bdc3c7;
    position: relative;
    overflow: hidden;
    min-height: 136px;
  }

  .bangumi-item--title
  {
    font-size: 1em;
    margin: 10px 0;
    line-height: 1.4;
    padding-right: 25px;
  }

  .bangumi-item__search .bangumi-item--title
  {
    margin-top: 0;
  }

  .bangumi-item--title .title
  {
    line-height: 1.5;
  }

  .bangumi-item--title .title strong
  {
    text-transform: lowercase;
    font-weight: 300;
  }

  .title--list-item:before
  {
    content: "，";
  }

  .title--list-item:first-child:before
  {
    content: "";
  }

  .bangumi-item--fav
  {
    position: absolute;
    right: 0;
    top: 10px;
    line-height: 1.4;
    color: #bdc3c7;
    cursor: pointer;
  }

  .bangumi-item--fav.faved
  {
    color: #d35400;
  }

  .body
  {
    position: relative;
    overflow: hidden;
  }

  .body > p
  {
    font-size: .9em;
    margin: 10px 0;
  }

  .body .meta
  {
    margin-bottom: 0;
  }

  .meta--item {
    margin-right: 20px;
  }

  .meta--title
  {
    color: #7f8c8d;
  }

  .meta--content > a
  {
    margin-right: 5px;
  }

  @media screen and (max-width: 39.9375em) {

    .bangumi-item
    {
      padding-bottom: 0;
    }

    .bangumi-item--title
    {
      margin-top: 0;
    }

    .bangumi-item--fav
    {
      top: 0;
    }

    .meta--item
    {
      display: block;
      margin: 5px 0 10px;
    }

    .body > p
    {
      font-size: .8em;
    }

  }

</style>
