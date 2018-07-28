<template>
  <div>
    <rwv-list-errors
      :errors="errors">
    </rwv-list-errors>
    <form class="card comment-form" v-on:submit.prevent="onSubmit(slug, comment)">
      <div class="card-block">
         <markdown-editor id="contentEditor" ref="contentEditor" v-model="comment" :height="150" :zIndex="20"  placeholder="这是一个markdown编辑器"></markdown-editor>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img" />
        <button class="btn btn-sm btn-primary"> Post Comment </button>
      </div>
    </form>
  </div>
</template>

<script>
import RwvListErrors from '@/components/ListErrors'
import { COMMENT_CREATE } from '@/store/actions.type'
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: 'RwvCommentEditor',
  components: {
    RwvListErrors,
    MarkdownEditor
  },
  props: {
    slug: { type: String, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false }
  },
  data () {
    return {
      comment: this.content || null,
      errors: {}
    }
  },
  methods: {
    onSubmit (slug, comment) {
      this.$store
        .dispatch(COMMENT_CREATE, { slug, comment })
        .then(() => {
          this.comment = null
          this.errors = {}
        })
        .catch(({ response }) => {
          this.errors = response.data.errors
        })
    }
  }
}
</script>
