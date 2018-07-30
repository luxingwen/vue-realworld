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
              <li v-for="(item, index) in topUsers">
                 <router-link
                  :to="{ name: 'profile', params: { 'username': item.username } }">
                  <img :src="item.image" width="50" height="50" />
                </router-link>
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

               <li class="nav-item" v-if="type">
                <router-link
                  :to="{name: 'home-type', params: {type}}"
                  class="nav-link"
                  active-class="active">
                  <i class="ion-pound"></i>
                  {{ type }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>

        </div>
         <div class="col-md-3">
          <div class="sidebar" style="height:300px;">
            <p>话题</p>
             <RwvType
                v-for="(item, index) in types"
                :name="item.name"
                :key="index">
              </RwvType>
           <!--  <div  v-for="(item, index) in types" style="float:left;">
               <el-button type="info" style="margin-left:3px; margin-top:3px;" @click.native="typeClick(item)" round> {{ item.name }} </el-button>
            </div> -->
          </div>
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
    width: 100%;
    float: left;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import RwvTag from '@/components/VTag'
  import RwvType from '@/components/VType'
  import { FETCH_TAGS, FETCH_TYPES, FETCH_TOPUSERS } from '@/store/actions.type'

  export default {
    name: 'home',
    components: {
      RwvTag,
      RwvType
    },
    data () {
      return {
        typename: ''
      }
    },
    mounted () {
      this.$store.dispatch(FETCH_TAGS)
      this.$store.dispatch(FETCH_TYPES)
      this.$store.dispatch(FETCH_TOPUSERS)
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'tags',
        'types',
        'topUsers'
      ]),
      tag () {
        return this.$route.params.tag
      },
      type () {
        return this.$route.params.type
      }
    },
    methods: {
      typeClick (item) {
        console.log(item)
        this.typename = item.name
      }
    }
  }
</script>
