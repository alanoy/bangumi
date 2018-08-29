<template>
  <div class="container">
    <footer class="footer text-gray">
      <div class="copyright">
        &copy; 2017-{{ currentYear }}, <a href="//bangu.me" title="番组放送">bangu.me</a> by <a href="//ideapart.com" title="ideapart">Alan</a>
      </div>

      <!--<div class="power">-->
        <!--Host on <a href="http://www.vultr.com/?ref=6878833">VULTR</a>-->
      <!--</div>-->
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer',

    data() {
      return {
        currentYear: new Date().getFullYear(),
      }
    }
  }
</script>

<style scoped>

  .footer
  {
    margin: 20px 0;
    font-size: .9em;
    overflow: hidden;
  }

  .footer a {
    color: #969da6;
    border-bottom: 1px solid #969da6;
    transition: all .15s ease;
  }

  .footer a:hover {
    color: rgba(150, 157, 166, .7);
  }

  .copyright
  {
    width: 70%;
    float: left;
  }

  .power
  {
    width: 30%;
    float: right;
    text-align: right;
  }

</style>
