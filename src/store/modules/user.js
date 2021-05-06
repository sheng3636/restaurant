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
    menus: [],
    intervalId: '',
    canteenList: [],
    canteenId: ''
  }
}

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
        veryCode: verifyCode,
        u: u,
        loginposition: 1
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

        let {
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
        // let arr = []
        // for (let i = 0; i < menus.length; i++) {
        //   const pre = menus[i];
        //   for (let j = 0; j < pre.children.length; j++) {
        //     const old = pre.children[j];
        //     arr.push(old.path)
        //   }
        // }
        // console.log(arr);
        


        //  let routePermission = []

        // menus = [{
        //     "redirect": "/index/index",
        //     "path": "home",
        //     "component": "Layout",
        //     "hidden": false,
        //     "children": [{
        //       "path": "home",
        //       "component": "/index/index",
        //       "meta": {
        //         "icon": "index",
        //         "title": "首页"
        //       },
        //       "name": "/index/index",
        //       "url": "/index/index"
        //     }],
        //     "meta": {
        //       "icon": "dataOverview",
        //       "title": "首页"
        //     },
        //     "name": "首页"
        //   },
        //   {
        //     "path": "normalOrder",
        //     "component": "Layout",
        //     "hidden": false,
        //     "children": [{
        //       "path": "/business/normalOrder",
        //       "component": "/business/normalOrder",
        //       "meta": {
        //         "icon": null,
        //         "title": "点餐详情"
        //       },
        //       "name": "/business/normalOrder",
        //       "url": "/business/normalOrder"
        //     }],
        //     "meta": {
        //       "icon": "detail",
        //       "title": "点餐详情"
        //     },
        //     "name": "点餐详情"
        //   },
        //   {
        //     "redirect": "/config/orderConfig",
        //     "path": "config",
        //     "component": "Layout",
        //     "hidden": false,
        //     "children": [{
        //         "path": "orderConfig",
        //         "component": "/config/orderConfig",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r4',
        //           "title": "订餐设置"
        //         },
        //         "name": "订餐设置",
        //         "url": "/config/orderConfig"
        //       },
        //       {
        //         "path": "meal",
        //         "component": "/config/meal",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r5',
        //           "title": "套餐配置"
        //         },
        //         "name": "套餐配置",
        //         "url": "/config/meal"
        //       },
        //       {
        //         "path": "site",
        //         "component": "/manager/site",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r11',
        //           "title": "网点管理"
        //         },
        //         "name": "网点管理",
        //         "url": "/manager/site"
        //       }
        //     ],
        //     "meta": {
        //       "icon": 'mealSeeting',
        //       "title": "用餐设置"
        //     },
        //     "name": "用餐设置"
        //   },
        //   {
        //     "redirect": "/account/index",
        //     "path": "account",
        //     "component": "Layout",
        //     "hidden": false,
        //     "children": [{
        //         "path": "user",
        //         "component": "/account/user",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r8',
        //           "title": "用户管理"
        //         },
        //         "name": "用户管理",
        //         "url": "/account/user"
        //       },
        //       {
        //         "path": "role",
        //         "component": "/account/role",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r9',
        //           "title": "角色管理"
        //         },
        //         "name": "角色管理",
        //         "url": "/account/role"
        //       },
        //       {
        //         "path": "department",
        //         "component": "/account/department",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r10',
        //           "title": "部门管理"
        //         },
        //         "name": "部门管理",
        //         "url": "/account/department"
        //       }
        //     ],
        //     "meta": {
        //       "icon": 'user1',
        //       "title": "账户设置"
        //     },
        //     "name": "账户设置"
        //   },
        //   {
        //     "redirect": "/manager/checkMachine",
        //     "path": "systemConfig",
        //     "component": "Layout",
        //     "hidden": false,
        //     "children": [{
        //         "path": "canteen",
        //         "component": "/config/canteen",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r6',
        //           "title": "食堂设置"
        //         },
        //         "name": "食堂设置",
        //         "url": "/config/canteen"
        //       },
        //       {
        //         "path": "checkMachine",
        //         "component": "/config/checkMachine",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": 'r7',
        //           "title": "核销机管理"
        //         },
        //         "name": "核销机管理",
        //         "url": "/config/checkMachine"
        //       }
        //     ],
        //     "meta": {
        //       "icon": 'system',
        //       "title": "系统设置"
        //     },
        //     "name": "系统设置"
        //   },
        //   {
        //     "redirect": "/system/parameterInfoBusiness",
        //     "path": "system",
        //     "component": "Layout",
        //     "hidden": false,
        //     "children": [{
        //         "path": "parameterInfoBusiness",
        //         "component": "/system/parameterInfoBusiness",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "业务参数设置"
        //         },
        //         "name": "业务参数设置",
        //         "url": "/system/parameterInfoBusiness"
        //       },
        //       {
        //         "path": "configItemMenu",
        //         "component": "/system/configItemMenu",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "定制化菜单"
        //         },
        //         "name": "定制化菜单",
        //         "url": "/system/configItemMenu"
        //       },
        //       {
        //         "path": "dept",
        //         "component": "/system/dept",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "人员组织"
        //         },
        //         "name": "人员组织",
        //         "url": "/system/dept"
        //       },
        //       {
        //         "path": "role",
        //         "component": "/system/role",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "角色授权"
        //         },
        //         "name": "角色授权",
        //         "url": "/system/role"
        //       },
        //       {
        //         "path": "logging",
        //         "component": "/system/logging",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "日志查询"
        //         },
        //         "name": "日志查询",
        //         "url": "/system/logging"
        //       },
        //       {
        //         "path": "functionAuthority",
        //         "component": "/system/functionAuthority",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "菜单权限"
        //         },
        //         "name": "菜单权限",
        //         "url": "/system/functionAuthority"
        //       },
        //       {
        //         "path": "parameterInfo",
        //         "component": "/system/parameterInfo",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "参数设置"
        //         },
        //         "name": "参数设置",
        //         "url": "/system/parameterInfo"
        //       },
        //       {
        //         "path": "schedule",
        //         "component": "/system/schedule",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "定时任务"
        //         },
        //         "name": "定时任务",
        //         "url": "/system/schedule"
        //       },
        //       {
        //         "path": "template",
        //         "component": "/system/template",
        //         "hidden": false,
        //         "children": [],
        //         "meta": {
        //           "icon": '',
        //           "title": "生成代码"
        //         },
        //         "name": "生成代码",
        //         "url": "/system/template"
        //       }
        //     ],
        //     "meta": {
        //       "icon": "systemSetting",
        //       "title": "管理设置"
        //     },
        //     "name": "管理设置"
        //   }
        // ]
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
  }, {
    id
  }) {
    return new Promise(resolve => {
      commit('SET_INTERVAL', id)
      resolve()
    })
  },

  // 设置选中食堂ID变化
  setCanteenId({
    commit
  }, {
    id
  }) {
    return new Promise(resolve => {
      commit('SET_CANTEEN', id)
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
