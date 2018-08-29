<template>
  <section class="container">
    <div class="error">

      <h1 class="title">
        {{ error.statusCode }}
      </h1>

      <h2 class="info">
        {{ error.message }}
      </h2>

      <p>
        <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
          Homepage
        </nuxt-link>
      </p>

    </div>
  </section>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
  .error
  {
    margin: 0 40px;
  }

  .title
  {
    font-size: 2em;
  }

  .title,
  .info
  {
    margin: 20px 0;
    line-height: 1.2;
  }

</style>
