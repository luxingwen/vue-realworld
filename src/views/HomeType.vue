<template>
  <div class="home-type">
    <RwvArticleList :type="type"></RwvArticleList>
  </div>
</template>
<script>
  import RwvArticleList from '@/components/ArticleList'

  export default {
    name: 'RwvHomeType',
    components: {
      RwvArticleList
    },
    computed: {
      type () {
        return this.$route.params.type
      }
    }
  }
</script>
