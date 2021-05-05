import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  //baseURL: 'http://localhost:8083/prod-api', // url = base url + request url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 100000 // 请求设置网络超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    if (store.getters.token) {
      // 让每个请求携带token
      // ['X-Token']是一个请求头
      // 请根据实际情况修改
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 为调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想要获得http信息， 比如header或statustor
   * 请返回 response => response
   */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data
    // 如果自定义代码不为'0'，则判断为错误。
    if (res.code !== '0' && res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法token;50012:其他客户登录;50014:token过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登陆
        MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认注销', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
    // 50008:非法token;50012:其他客户登录;50014:token过期;
      if (res.code === 401 ) {
        // 重新登陆
        MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认注销', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload() 
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
      // return res
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // 为调试
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 增删改查接口请求方法  axios 是用来做ajax的请求
export const apiGet = (that, url, params) => {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 增删改查接口请求方法  axios 是用来做ajax的请求
export const apiGetNoRes = (that, url, params) => {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    }).catch(err => {
      reject(err)
    })
  })
}

// 通用提示内容post提交接口请求方法
export const apiPost = (that, url, params) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认提交吗？', '提示', {}).then(() => {
      service.post(url, params).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  })
}
// 通用提示内容post提交接口请求方法
export const messagePost = (that, url, params) => {
  return new Promise((resolve, reject) => {
      service.post(url, params).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

//  formData 方式提交 post 接口请求方法
export const apiPostFormData = (that, url, formData) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认提交吗？', '提示', {}).then(() => {
      service({
        url: url,
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
      }).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  })
}

// 自定义提示内容post提交接口请求方法
export const apiPostCustom = (that, url, params, content) => {
  return new Promise((resolve, reject) => {
    that.$confirm(content, '提示', {
      type: 'warning'
    }).then(() => {
      service.post(url, params).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  })
}

// 无提示内容post提交接口请求方法
export const apiDefaultPost = (that, url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 通用提示内容put修改接口请求方法
export const apiPut = (that, url, params) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认提交吗？', '提示', {}).then(() => {
      service.put(url, params).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  })
}

export const apiPutFormData = (that, url, formData) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认提交吗？', '提示', {}).then(() => {
      service({
        url: url,
        method: 'put',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
      }).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  })
}

// 无提示内容put提交接口请求方法
export const apiDefaultPut = (that, url, params) => {
  return new Promise((resolve, reject) => {
    service.put(url, params).then(res => {
      const code = res.code
      const type = code == 0 ? 'success' : 'warning'
      that.$message({
        type: type,
        message: res.message
      })
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 自定义提示内容put提交接口请求方法
export const apiPutCustom = (that, url, params, content) => {
  return new Promise((resolve, reject) => {
    that.$confirm(content, '提示', {
      type: 'warning'
    }).then(() => {
      service.put(url, params).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  })
}

// 通用提示内容delete删除接口请求方法
export const apiDelete = (that, url, data) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认删除该记录吗?', '提示', {
      type: 'warning'
    }).then(() => {
      service.delete(url, {
        data: data
      }).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res.data)
      }).catch(err => {
        that.listLoading = false
        reject(err)
      })
    })
  })
}

// 自定义提示内容delete删除接口请求方法
export const apiDeleteCustom = (that, url, data, content) => {
  return new Promise((resolve, reject) => {
    that.$confirm(content, '提示', {
      type: 'warning'
    }).then(() => {
      service.delete(url, {
        data: data
      }).then(res => {
        const code = res.code
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          type: type,
          message: res.message
        })
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  })
}
// 下载  axios 是用来做ajax的请求
export const apiGetDownload = (that, url, params) => {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    }).then(res => {
      // 为了简单起见这里blob的mime类型 固定写死了
      let type = 'application/pdf;' //'image/png'
      let blob = new Blob([res], { type: type })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      // link.download = fileName || url.split('/').pop();
      link.click()
    }).catch(err => {
      reject(err)
    })
  })
}

export default service
