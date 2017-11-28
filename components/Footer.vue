<template>
  <div class="container">
    <footer class="footer">
      <div class="copyright">
        &copy; 2017, <a href="//bangu.me" title="番组放送">bangu.me</a> by <a href="//ideapart.com" title="ideapart">Alan</a>
      </div>

      <!--<div class="power">-->
        <!--Host on <a href="http://www.vultr.com/?ref=6878833">VULTR</a>-->
      <!--</div>-->
    </footer>
  </div>
</template>

<style scoped>

  .footer
  {
    margin: 20px 15px;
    font-size: .9em;
    overflow: hidden;
  }

  .footer a
  {
    color: #2c3e50;
    border-bottom: 1px solid #bdc3c7;
    font-weight: 400;
  }
  
  .footer a:hover {
    border-bottom-color: #2c3e50;
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
