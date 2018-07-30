<template>
  <router-link :to="{ name: 'home-type', params: { type: name} }" :class="className">
    {{ name }}
  </router-link>
</template>
<script>
  export default {
    name: 'RwvType',
    props: {
      name: {
        type: String,
        required: true
      },
      className: {
        type: String,
        default: 'tag-pill tag-default'
      }
    }
  }
</script>
