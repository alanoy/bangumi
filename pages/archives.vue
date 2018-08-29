<template>
  <div class="row container">
    <div
      class="col-md-6 archives"
      v-for="(data, i) in archives"
      :key="i">

      <h2 class="text-gray title">{{ data.year }} 年：</h2>
      <ul class="list">
        <li
          class="item"
          v-for="(len, m) in data.items"
          :key="m">
          <a
            :href="`/archive/${data.year}-${m}`"
            :title="`${data.year} 年 ${m} 月番`">{{ data.year }} 年 {{ m }} 月番（{{ len }}）</a>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    name: 'Archives',

    async asyncData ({ params, error }) {
      const { data } = await axios.get('/api/archives')

      return {
        archives: data
      }
    },

    head () {
      return {
        title: '归档 - 番组放送'
      }
    }

  }
</script>

<style scoped>
  .archives
  {
    margin: 20px 0;
    box-sizing: border-box;
    min-height: 210px;
  }

  .title
  {
    font-size: 1.4em;
  }

</style>
