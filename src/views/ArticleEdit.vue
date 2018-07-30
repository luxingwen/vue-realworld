<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <RwvListErrors :errors="errors"/>
          <form v-on:submit.prevent="onPublish(article.slug, article)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="我是标题，不少于四个字符">
              </fieldset>
              <fieldset class="form-group">
                  <el-select  placeholder="请选择类型" value-key="id" v-model="typevalue" style="width:100%;">
                     <el-option v-for="item in types" :label="item.name" :key="item.id"  :value="item">
                     </el-option>
                  </el-select>
                <!-- <input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"> -->
              </fieldset>
              <fieldset class="form-group" style="width:100%;float:left;">
                 <markdown-editor id="contentEditor" ref="contentEditor" v-model="article.body"  :zIndex="20"  placeholder="这是一个markdown编辑器"></markdown-editor>
              </fieldset>
              <fieldset class="form-group" style="width:100%;float:left;">
                <input
                  type="text"
                  class="form-control"
                  placeholder="按回车键或者空格键加标签"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="addTag(tagInput)"
                  v-on:keypress.space.prevent="addTag(tagInput)">
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index">
                  <i
                    class="ion-close-round"
                    v-on:click="removeTag(tag)">
                </i>
                {{ tag }}
              </span>
                </div>
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit">
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
  
</style>
<script>
  import { mapGetters } from 'vuex'
  import store from '@/store'
  import RwvListErrors from '@/components/ListErrors'
  import MarkdownEditor from '@/components/MarkdownEditor'
  import request from '@/utils/request'
  import {
    ARTICLE_PUBLISH,
    ARTICLE_EDIT,
    FETCH_ARTICLE,
    ARTICLE_EDIT_ADD_TAG,
    ARTICLE_EDIT_REMOVE_TAG,
    ARTICLE_RESET_STATE
  } from '@/store/actions.type'

  export default {
    name: 'RwvArticleEdit',
    components: {
      RwvListErrors,
      MarkdownEditor
    },
    props: {
      previousArticle: {
        type: Object,
        required: false
      }
    },
    async beforeRouteUpdate (to, from, next) {
      // Reset state if user goes from /editor/:id to /editor
      // The component is not recreated so we use to hook to reset the state.
      await store.dispatch(ARTICLE_RESET_STATE)
      return next()
    },
    async beforeRouteEnter (to, from, next) {
      // SO: https://github.com/vuejs/vue-router/issues/1034
      // If we arrive directly to this url, we need to fetch the article
      await store.dispatch(ARTICLE_RESET_STATE)
      if (to.params.slug !== undefined) {
        await store.dispatch(FETCH_ARTICLE,
          to.params.slug,
          to.params.previousArticle
        )
      }
      return next()
    },
    async beforeRouteLeave (to, from, next) {
      await store.dispatch(ARTICLE_RESET_STATE)
      next()
    },
    data () {
      return {
        tagInput: null,
        inProgress: false,
        types: [],
        typevalue: '',
        errors: {}
      }
    },
    computed: {
      ...mapGetters([
        'article'
      ])
    },
    methods: {
      onPublish (slug, article) {
        let action = slug ? ARTICLE_EDIT : ARTICLE_PUBLISH
        this.inProgress = true
        article.typeId = this.typevalue.id
        this.$store
          .dispatch(action)
          .then(({ data }) => {
            this.inProgress = false
            this.$router.push({
              name: 'article',
              params: { slug: data.article.slug }
            })
          })
          .catch(({ response }) => {
            this.inProgress = false
            this.errors = response.data.errors
            article.title = ''
            article.description = ''
            article.body = ''
            article.tagList = []
          })
      },
      removeTag (tag) {
        this.$store.dispatch(ARTICLE_EDIT_REMOVE_TAG, tag)
      },
      addTag (tag) {
        this.$store.dispatch(ARTICLE_EDIT_ADD_TAG, tag)
        this.tagInput = null
      }
    },
    mounted () {
      request({
        url: '/types/',
        method: 'get'
      }).then(resData => {
        this.types = resData.data.types
        console.log(this.types)
      })
    }
  }
</script>
