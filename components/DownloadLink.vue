<template>
  <a :href="href" target="_blank">{{ item.title }}</a>
</template>

<script>
  export default {
    name: 'DownloadLink',

    props: {
      data: Object,
      title: String,
      item: Object
    },

    computed: {
      href () {
        let { title, item, data } = this

        if (item.title.toLowerCase() === 'nyaa') title = data.title

        return item.urlTemplate.replace('{{keyword}}', encodeURIComponent(title))
      }
    }
  }
</script>

<style scoped>

  a
  {
    text-transform: capitalize;
  }

</style>
