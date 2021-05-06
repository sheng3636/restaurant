import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/',
    component: () => import('@/components/whole.vue'),
    meta: {
      title: '整体页面布局'
    },
    children: [{
        path: '/index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页'
        },
        redirect: '/index', // 该配置是若点击选择父目录时，默认选中该父目录下的子路径页面
        children: [{
          path: '/index',
          component: () => import('@/views/index/index.vue'),
          meta: {
            title: '首页'
          },
        }]
      },
      {
        path: '/normalOrder',
        component: () => import('@/views/business/normalOrder.vue'),
        meta: {
          title: '点餐详情'
        }
      },
      {
        path: '/config',
        component: () => import('@/views/config/index.vue'),
        meta: {
          title: '用餐设置'
        },
        redirect: '/config/orderConfig', // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
        children: [{
            path: 'orderConfig',
            component: () => import('@/views/config/orderConfig.vue'),
            meta: {
              title: '订餐设置'
            },
          },
          {
            path: 'meal',
            component: () => import('@/views/config/meal.vue'),
            meta: {
              title: '套餐设置'
            },
          },
          {
            path: 'site',
            component: () => import('@/views/manager/site.vue'),
            meta: {
              title: '网点设置'
            },
          }
        ]
      },
      {
        path: '/account',
        component: () => import('@/views/account/index.vue'),
        meta: {
          title: '账号管理'
        },
        redirect: '/account/user', // 该配置是若点击选择父目录时，默认选中该父目录下的子路径页面
        children: [{
            path: 'user',
            component: () => import('@/views/account/user.vue'),
            meta: {
              title: '用户管理'
            },
          },
          {
            path: 'role',
            component: () => import('@/views/account/role.vue'),
            meta: {
              title: '角色管理'
            },
          },
          {
            path: 'department',
            component: () => import('@/views/account/department.vue'),
            meta: {
              title: '部门管理'
            },
          },
        ]
      },
      {
        path: '/systemConfig',
        component: () => import('@/views/systemConfig/index.vue'),
        meta: {
          title: '系统设置'
        },
        redirect: '/systemConfig/canteen', // 该配置是若点击选择父目录时，默认选中该父目录下的子路径页面
        children: [{
            path: 'canteen',
            component: () => import('@/views/systemConfig/canteen.vue'),
            meta: {
              title: '食堂设置'
            },
          },
          {
            path: 'checkMachine',
            component: () => import('@/views/systemConfig/checkMachine.vue'),
            meta: {
              title: '核销机管理'
            },
          }
        ]
      },
      {
        path: '/system',
        component: () => import('@/views/system/index.vue'),
        meta: {
          title: '管理设置'
        },
        redirect: '/system/parameterInfoBusiness', // 该配置是若点击选择父目录时，默认选中该父目录下的子路径页面
        children: [{
            path: 'parameterInfoBusiness',
            component: () => import('@/views/system/parameterInfoBusiness.vue'),
            meta: {
              title: '业务参数设置'
            },
          },
          {
            path: 'configItemMenu',
            component: () => import('@/views/system/configItemMenu.vue'),
            meta: {
              title: '定制化菜单'
            },
          },
          {
            path: 'dept',
            component: () => import('@/views/system/dept.vue'),
            meta: {
              title: '人员组织'
            },
          },
          {
            path: 'role',
            component: () => import('@/views/system/role.vue'),
            meta: {
              title: '角色授权'
            },
          },
          {
            path: 'logging',
            component: () => import('@/views/system/logging.vue'),
            meta: {
              title: '日志查询'
            },
          },
          {
            path: 'functionAuthority',
            component: () => import('@/views/system/functionAuthority.vue'),
            meta: {
              title: '定制化菜单权限菜单'
            },
          },
          {
            path: 'parameterInfo',
            component: () => import('@/views/system/parameterInfo.vue'),
            meta: {
              title: '参数设置'
            },
          },
          {
            path: 'schedule',
            component: () => import('@/views/system/schedule.vue'),
            meta: {
              title: '定时任务'
            },
          },
          {
            path: 'template',
            component: () => import('@/views/system/template.vue'),
            meta: {
              title: '生成代码'
            },
          }
        ]
      }
    ]
  },
  // {
  //   path: '*',
  //   redirect: '/404'
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
  router.matcher = newRouter.matcher // 重置路由
}

export default router
