<template>
  <a
    :href="href"
    target="_blank"
    v-if="sites[site]"
    class="site">{{ title }}</a>
</template>

<script>
  export default {
    name: 'SiteLink',

    props: {
      item: Object,
      sites: Object
    },

    data () {
      return {
        ...this.item
      }
    },

    computed: {
      href () {
        const { site, id, sites } = this

        if (!sites[site]) return ''

        let url = sites[site].urlTemplate
        return url.replace('{{id}}', id)
      },

      title () {
        const { site, sites } = this

        if (!sites[site]) return ''

        return sites[site].title.trim()
      }
    }
  }
</script>
