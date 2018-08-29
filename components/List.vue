<template>
  <div class="bangumi-list">

    <template v-for="(item, i) in items">
      <list-item
        :key="i"
        :type="type"
        :item="item"
        :sites="sites" />
    </template>

  </div>
</template>

<script>
  import ListItem from './ListItem.vue'

  export default {
    name: 'List',

    components: { ListItem },

    props: {
      items: Array,
      sites: Object,
      type: {
        type: String,
        default: ''
      }
    }

  }
</script>

