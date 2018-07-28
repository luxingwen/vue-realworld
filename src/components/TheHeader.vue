<template>
  <nav class="navbar navbar-light" style="background-color:#fff;">
    <div class="container">
      <router-link class="navbar-brand"
        :to="{ name: 'home' }">
        biggerforum
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }">
            首页
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }">
            <i class="ion-compose"></i>登录
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'register' }">
            <i class="ion-compose"></i>注册
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            :to="{ name: 'article-edit' }">
            <i class="ion-compose"></i>&nbsp;新话题
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'settings' }">
            <i class="ion-gear-a"></i>&nbsp;设置
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.username">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'profile', params: { username: currentUser.username } }">
            {{ currentUser.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'RwvHeader',
    computed: {
      ...mapGetters([
        'currentUser',
        'isAuthenticated'
      ])
    }
  }
</script>
