import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局 */
import Layout from '@/layout'

/**
 * 注意: sub-menu子菜单仅在路由子菜单时出现在子路由长度 > = 1
 * 细节见: https: //panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden:                        当设置 true 的时候该路由不会再侧边栏出现 如401， login等页面， 或者如一些编辑页面 / edit / 1(默认 false)
 * alwaysShow: true               如果设置为true， 将始终显示根菜单
 *                                如果不设置alwaysShow， 当项目有多个子路由时，
 *                                它将成为嵌套模式， 否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name: 'router-name'            该名称由<keep-alive>使用(必须设置!!)
 * meta : {
    roles: ['admin', 'editor']    控制页面角色(您可以设置多个角色)
    title: 'title'                名称显示在侧栏和面包屑(推荐设置)
    icon: 'svg-name'              显示在侧栏中的图标
    breadcrumb: false             如果设置为false， 则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'   如果设置路径， 侧栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes代表那些不需要动态判断权限的路由， 如登录页、 404、 等通用页面。
 * 没有权限要求的基本页
 * 可以访问所有角色
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: 'aaa',
  //   name: 'aaa',
  //   component: () => import('@/views/businessMangement/infoBaseBusiness/components/addEditBusinessInfo'),
  //   meta: {
  //     title: '首页',
  //     icon: 'dashboard'
  //   }
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // 需要服务支持
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// 细节见: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
