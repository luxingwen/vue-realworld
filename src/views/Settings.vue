<template>
  <div class="settings-page" style="background-color:#fff;width:100%;height100%;margin:0px;padding:0px;">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人资料</span>
               <button @click="logout" class="btn btn-outline-danger" style="float: right; padding: 3px 0">
                 点我退出登录
               </button>
            </div>
            <el-form ref="form" label-width="80px">
              <el-form-item label="头像">
               <img v-bind:src="getimgUrl(currentUser.image)" width="100" height="100">
                <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">上传头像
                </el-button>
               <image-cropper :width="300" :height="300" url="/upload/avatar/" @close='close' @crop-upload-success="cropSuccess" langType="zh"
      :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
              </el-form-item>
              <el-form-item label="用户名">
               <el-input v-model="currentUser.username"></el-input>
              </el-form-item>
               <el-form-item label="个人介绍">
               <el-input v-model="currentUser.bio"></el-input>
              </el-form-item>
               <el-form-item label="邮箱">
               <el-input v-model="currentUser.email"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="primary" @click="updateSettings">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin-top: 20px;
  }
  ul{
    padding: 0px;
    margin: 0px;
    display: block;
    list-style-type: disc;
  }
  li{
    list-style: none;
  }

  .setting-list .item{
    display: flex;
    align-items: center;
    padding: 2 rem 0;
    border-top: 1px solid #f1f1f1;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import { LOGOUT, UPDATE_USER } from '@/store/actions.type'
  import ImageCropper from '@/components/ImageCropper'
  import { API_URL } from '@/common/config'

  export default {
    name: 'RwvSettings',
    components: { ImageCropper },
    computed: {
      ...mapGetters([
        'currentUser'
      ])
    },
    data () {
      return {
        imagecropperKey: 0,
        imagecropperShow: false
      }
    },
    methods: {
      updateSettings () {
        this.$store.dispatch(UPDATE_USER, this.currentUser)
          .then(() => {
            // #todo, nice toast and no redirect
            this.$router.push({ name: 'home' })
          })
      },
      logout () {
        this.$store
          .dispatch(LOGOUT)
          .then(() => {
            this.$router.push({ name: 'home' })
          })
      },
      cropSuccess (resData) {
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey + 1
        this.currentUser.image = resData.avatar
      },
      close () {
        this.imagecropperShow = false
      },
      getimgUrl (url) {
        var index = url.indexOf('http://')
        var index2 = url.indexOf('https://')
        if (index === 0 || index2 === 0) {
          return url
        }
        return API_URL + url
      }
    }
  }
</script>
