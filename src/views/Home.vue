<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">biggerforum</h1>
        <p>一个有逼格的社区.</p>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <div class="top-user">
            <div class="">
              这些用户都在这里...
            </div>
            <ul class="imgages">
              <li>
                <img src="https://avatars2.githubusercontent.com/u/16460296?s=460&v=4" width="50" height="50">
              </li>
               <li>
                <img src="http://www.anawalls.com/images/anime/mahou-shoujo-madoka-magica-akemi-homura-kaname-madoka-smile-pink-hair-two-eyes-closed-girls.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://s2.op46.com/anime/20180118005848kj5bdycnozi.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://avatars2.githubusercontent.com/u/16460296?s=460&v=4" width="50" height="50">
              </li>
               <li>
                <img src="http://www.anawalls.com/images/anime/mahou-shoujo-madoka-magica-akemi-homura-kaname-madoka-smile-pink-hair-two-eyes-closed-girls.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://s2.op46.com/anime/20180118005848kj5bdycnozi.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://avatars2.githubusercontent.com/u/16460296?s=460&v=4" width="50" height="50">
              </li>
               <li>
                <img src="http://www.anawalls.com/images/anime/mahou-shoujo-madoka-magica-akemi-homura-kaname-madoka-smile-pink-hair-two-eyes-closed-girls.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://s2.op46.com/anime/20180118005848kj5bdycnozi.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://avatars2.githubusercontent.com/u/16460296?s=460&v=4" width="50" height="50">
              </li>
               <li>
                <img src="http://www.anawalls.com/images/anime/mahou-shoujo-madoka-magica-akemi-homura-kaname-madoka-smile-pink-hair-two-eyes-closed-girls.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://s2.op46.com/anime/20180118005848kj5bdycnozi.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://avatars2.githubusercontent.com/u/16460296?s=460&v=4" width="50" height="50">
              </li>
               <li>
                <img src="http://www.anawalls.com/images/anime/mahou-shoujo-madoka-magica-akemi-homura-kaname-madoka-smile-pink-hair-two-eyes-closed-girls.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://s2.op46.com/anime/20180118005848kj5bdycnozi.jpg" width="50" height="50">
              </li> <li>
                <img src="https://avatars2.githubusercontent.com/u/16460296?s=460&v=4" width="50" height="50">
              </li>
               <li>
                <img src="http://www.anawalls.com/images/anime/mahou-shoujo-madoka-magica-akemi-homura-kaname-madoka-smile-pink-hair-two-eyes-closed-girls.jpg" width="50" height="50">
              </li>
               <li>
                <img src="https://s2.op46.com/anime/20180118005848kj5bdycnozi.jpg" width="50" height="50">
              </li>
            </ul>
          </div>

          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                  :to="{name: 'home-my-feed'}"
                  class="nav-link"
                  active-class="active">
                  我关注的
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name: 'home'}"
                  exact
                  class="nav-link"
                  active-class="active">
                  所有
                </router-link>
              </li>
              
              <li class="nav-item" v-if="tag">
                <router-link
                  :to="{name: 'home-tag', params: {tag}}"
                  class="nav-link"
                  active-class="active">
                  <i class="ion-pound"></i>
                  {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>

        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>热门标签</p>
            <div class="tag-list">
              <RwvTag
                v-for="(tag, index) in tags"
                :name="tag"
                :key="index">
              </RwvTag>
            </div>
          </div>
        </div>
      </div>
    </div>

  
  </div>
</template>

<style type="text/css">
  ul.imgages {
    list-style-type: none;
    display: inline;
  }
  ul li{
     float: left;
  }
  li {
    margin-left: 2px;
  }
  .top-user{
    float: left;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import RwvTag from '@/components/VTag'
  import { FETCH_TAGS } from '@/store/actions.type'

  export default {
    name: 'home',
    components: {
      RwvTag
    },
    mounted () {
      this.$store.dispatch(FETCH_TAGS)
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'tags'
      ]),
      tag () {
        return this.$route.params.tag
      }
    }
  }
</script>
