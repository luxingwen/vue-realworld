<template>
  <footer>
    <div class="container">
      <router-link class="logo-font"
        :to="{ name: 'home', params: {} }">
        biggerforum
      </router-link>
      <span class="attribution">
        power by
        <a target="blank" href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'rwvFooter'
}
</script>
