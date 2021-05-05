import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import {
  getToken, getSession
} from '@/utils/auth' // 从cookie获取token
import getPageTitle from '@/utils/get-page-title'
// const _import = require('./router/_import_' + process.env.NODE_ENV)//获取组件的方法
import Layout from '@/layout'


function checkExist(list, path, obj){
  if(list && list.length){
    list.forEach(item => {
      if(item.path === path){
        obj.flag = true
      }else{
        checkExist(item.children,path,obj)
      }
    })
  
  }
}


NProgress.configure({
  showSpinner: false
}) // NProgress配置

const whiteList = ['/login','/404'] // 不需要重定向白名单

router.beforeEach(async (to, from, next) => {

  function filterAsyncRouter(asyncRouterMap){
   
    const accessedRouters = asyncRouterMap.filter(route => {
 
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } 
      else {
        
        route.component = (resolve) => require(["@/views" + route.path + ".vue"], resolve)
      }
      if (route.children && route.children.length>0) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    })
  
    return accessedRouters
  }


  NProgress.start() // 进度条
  document.title = getPageTitle(to.meta.title) // 设置页面标题 
  const hasToken = getToken() // 确定用户是否已登录 
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({
        path: '/'
      })
      NProgress.done()
    } else { 
      const hasGetUserInfo = store.getters.name
      
      if (hasGetUserInfo) {
        console.log(4)
        next()
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next() // 白名单中有的路由，可以继续访问
        } else {
          try {
            // 获取用户信息
            await store.dispatch('user/getInfo')
            
            let routerData=filterAsyncRouter(store.getters.menus)
             
            router.options.routes = routerData
            router.addRoutes(routerData); // 动态添加可访问路由表

            // 因有退出重新登录时，记录回传地址功能
            // 若用户退出后，切换登录账户，检测回传地址是否在用户权限之内
            let obj = {flag: false}
            checkExist(routerData,to.path,obj)

            if(obj.flag){
              next({ ...to, replace: true })
            }else{
              next({
                path: '/'
              })
            }

            
            //next()
          } catch (error) {
            // 删除token，进入登录页面重新登录
            await store.dispatch('user/resetToken')
            Message.error(error || '错误！！！')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
        
      }
    }
  } else { 
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next() // 白名单中有的路由，可以继续访问
    } else {
      next(`/login?redirect=${to.path}`) // 没有访问权限的其他页面被重定向到登录页面。
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})
