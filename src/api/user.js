import request from '@/utils/request'

// 获取登录验证码
export function getVerifyCode(params) {
  return request({
    url: 'verifyCodeServlet',
    method: 'get',
    params
  })
}

// 验证登录验证码是否通过
export function resultServlet(data) {
  return request({
    url: 'resultServlet',
    method: 'post',
    data
  })
}

// 登录
export function login(data) {
  // conosle.log(data)
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: 'user/info',
    method: 'get',
    params: { token }
  })
} 

// 获取用户权限
export function accessPermission(token) {
  return request({
    url: 'accessPermission',
    method: 'post',
    data: {
      token
    }
  })
}
 
// 注销
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
