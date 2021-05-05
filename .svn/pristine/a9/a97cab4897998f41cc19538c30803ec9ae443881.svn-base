import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menus:[],
    intervalId: '',
    canteenList:[],
    canteenId:''
  }
}
import Layout from '@/layout'

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_CANTEEN_LIST: (state, canteenList) => {
    state.canteenList = canteenList
  },
  SET_CANTEEN: (state, canteenId) => {
    state.canteenId = canteenId
  },
  SET_INTERVAL: (state, intervalId) => {
    state.intervalId = intervalId
  } 
}
 
const actions = {
  // 用户登录
  login({
    commit
  }, userInfo) {
    const {
      username,
      password,
      verifyCode,
      u, 
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        veryCode:verifyCode,u:u,loginposition: 1 
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      console.log('respons')
      getInfo(state.token).then(response => {
        console.log('respons')
        const {
          data
        } = response

        if (!data) {
          reject('验证失败，请重新登录。')
        }

        const {
          name,
          avatar,
          menus,
          canteenList
        } = data
        // let menus = data.permission.menus
        // let auth = data.permission.auth
        // if (!Array.isArray(menus)) {
        //   return document.body.innerHTML = ('<h1>账号访问受限，请联系系统管理员！</h1>');
        // }
        //  let routePermission = []


        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_MENUS', menus)
        commit('SET_CANTEEN_LIST', canteenList)
        commit('SET_CANTEEN', canteenList[0].id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户注销
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 必须先删除token
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // 必须先删除token
      commit('RESET_STATE')
      resolve()
    })
  },

  // 设置定时器ID
  setInterval({
    commit
  }, { id }) {
    return new Promise(resolve => {
      commit('SET_INTERVAL',id)
      resolve()
    })
  },

  // 设置选中食堂ID变化
  setCanteenId({
    commit
  }, { id }) {
    return new Promise(resolve => {
      commit('SET_CANTEEN',id)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
