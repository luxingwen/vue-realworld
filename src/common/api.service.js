import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: API_URL, // api的base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return res
    }
  }, error => {
    console.log('err' + error)
    Message({
      message: error.data.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
  },

  query (resource, params) {
    return service
      .get(resource, params)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  },

  get (resource, slug = '') {
    return service
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  },

  post (resource, params) {
    console.log(resource)
    return service.post(`${resource}`, params)
  },

  update (resource, slug, params) {
    return service.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return service
      .put(`${resource}`, params)
  },

  delete (resource) {
    return service
      .delete(resource)
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
  }
}

export default ApiService

export const TagsService = {
  get () {
    return ApiService.get('tags')
  }
}

export const TypesService = {
  get () {
    return ApiService.get('types')
  }
}

export const TopUsersService = {
  get () {
    return ApiService.get('top_user')
  }
}

export const ArticlesService = {
  query (type, params) {
    if (type !== 'feed') {
      params.type = type
    }
    return ApiService
      .query(
        'articles/' + (type === 'feed' ? 'feed' : ''),
        { params: params }
      )
  },
  get (slug) {
    return ApiService.get('articles', slug)
  },
  create (params) {
    return ApiService.post('articles/', {article: params})
  },
  update (slug, params) {
    return ApiService.update('articles', slug, {article: params})
  },
  destroy (slug) {
    return ApiService.delete(`articles/${slug}`)
  }
}

export const CommentsService = {
  get (slug) {
    if (typeof slug !== 'string') {
      throw new Error('[RWV] CommentsService.get() article slug required to fetch comments')
    }
    return ApiService.get('articles', `${slug}/comments`)
  },

  post (slug, payload) {
    return ApiService.post(
      `articles/${slug}/comments`, { comment: { body: payload } })
  },

  destroy (slug, commentId) {
    return ApiService
      .delete(`articles/${slug}/comments/${commentId}`)
  }
}

export const FavoriteService = {
  add (slug) {
    return ApiService.post(`articles/${slug}/favorite`)
  },
  remove (slug) {
    return ApiService.delete(`articles/${slug}/favorite`)
  }
}
