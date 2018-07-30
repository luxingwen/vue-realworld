import {
  TagsService,
  ArticlesService,
  TypesService,
  TopUsersService
} from '@/common/api.service'
import {
  FETCH_ARTICLES,
  FETCH_TAGS,
  FETCH_TYPES,
  FETCH_TOPUSERS
} from './actions.type'
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  SET_TYPES,
  SET_TOPUSERS,
  UPDATE_ARTICLE_IN_LIST
} from './mutations.type'

const state = {
  tags: [],
  articles: [],
  types: [],
  topUsers: [],
  isLoading: true,
  articlesCount: 0
}

const getters = {
  articlesCount (state) {
    return state.articlesCount
  },
  articles (state) {
    return state.articles
  },
  isLoading (state) {
    return state.isLoading
  },
  tags (state) {
    return state.tags
  },
  types (state) {
    return state.types
  },
  topUsers (state) {
    return state.topUsers
  }
}

const actions = {
  [FETCH_ARTICLES] ({ commit }, params) {
    commit(FETCH_START)
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FETCH_TAGS] ({ commit }) {
    return TagsService.get()
      .then(({ data }) => {
        commit(SET_TAGS, data.tags)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FETCH_TYPES] ({ commit }) {
    return TypesService.get()
      .then(({ data }) => {
        commit(SET_TYPES, data.types)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FETCH_TOPUSERS] ({ commit }) {
    return TopUsersService.get()
      .then(({ data }) => {
        commit(SET_TOPUSERS, data.users)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START] (state) {
    state.isLoading = true
  },
  [FETCH_END] (state, { articles, articlesCount }) {
    state.articles = articles
    state.articlesCount = articlesCount
    state.isLoading = false
  },
  [SET_TAGS] (state, tags) {
    state.tags = tags
  },
  [UPDATE_ARTICLE_IN_LIST] (state, data) {
    state.articles = state.articles.map((article) => {
      if (article.slug !== data.slug) { return article }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited
      article.favoritesCount = data.favoritesCount
      return article
    })
  },
  [SET_TYPES] (state, types) {
    state.types = types
  },
  [SET_TOPUSERS] (state, topUsers) {
    state.topUsers = topUsers
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
