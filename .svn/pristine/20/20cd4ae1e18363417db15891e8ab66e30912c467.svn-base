import axios from 'axios'
import {
  Message
}
  from 'element-ui'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
// 添加请求拦截器,在发送请求之前做些什么
axios.interceptors.request.use(function(config) {
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器-对响应数据做点什么
axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求出错'
        break
      case 401:
        Message.warning('授权失败，请重新登录')
        // sessionStorage.token = ''
        setTimeout(() => {
          window.location.reload()
        }, 1000)

        return
      case 403:
        Message.warning('拒绝访问')
        // sessionStorage.token = ''
        setTimeout(() => {
        //   window.location.reload()
        }, 1000)
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方式错误'
        break
      case 500:
        error.message = '服务器端出错'
        break
    }
  } else {
    error.message = '连接服务器失败'
  }
  Message.error(error.message)
})

// 增删改查接口请求方法  axios 是用来做ajax的请求
export const apiGet = (that, url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const apiPost = (that, url, params) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认提交吗？', '提示', {}).then(() => {
      that.addLoading = true
      axios.post(url, params).then(res => {
        that.editLoading = false
        const code = res.data.code
        const message = res.data.message
        const type = code == '0' ? 'success' : 'warning'
        that.$message({
          message: message,
          type: type
        })
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  })
}
export const apiPostCustom = (that, url, params, content) => {
  return new Promise((resolve, reject) => {
    that.$confirm(content, '提示', {
      type: 'warning'
    }).then(() => {
      axios.post(url, params).then(res => {
        const code = res.data.code
        const message = res.data.message
        const type = code == '0' ? 'success' : 'warning'
        that.$message({
          message: message,
          type: type
        })
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  })
}
export const apiPostNoPrompt = (that, url, params) => {
  return new Promise((resolve, reject) => {
    that.addLoading = true
    axios.post(url, params).then(res => {
      that.editLoading = false
      const code = res.data.code
      const message = res.data.message
      const type = code == 0 ? 'success' : 'warning'
      that.$message({
        message: message,
        type: type
      })
      resolve(res.data)
    }).catch(err => {
      that.editLoading = false
      reject(err)
    })
  })
}

export const apiDefaultPost = (that, url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const apiPut = (that, url, params) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认提交吗？', '提示', {}).then(() => {
      that.editLoading = true
      axios.put(url, params).then(res => {
        that.editLoading = false
        const code = res.data.code
        const message = res.data.message
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          message: message,
          type: type
        })
        resolve(res.data)
      }).catch(err => {
        that.editLoading = false
        reject(err)
      })
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

export const apiPutNoPrompt = (that, url, params) => {
  return new Promise((resolve, reject) => {
    that.editLoading = true
    axios.put(url, params).then(res => {
      that.editLoading = false
      const code = res.data.code
      const message = res.data.message
      const type = code == 0 ? 'success' : 'warning'
      that.$message({
        message: message,
        type: type
      })
      resolve(res.data)
    }).catch(err => {
      that.editLoading = false
      reject(err)
    })
  })
}

// 公共修改状态方法
export const apiStatePut = (that, url, params, message) => {
  return new Promise((resolve, reject) => {
    that.$confirm(message, '提示', {}).then(() => {
      that.editLoading = true
      axios.put(url, params).then(res => {
        that.editLoading = false
        const code = res.data.code
        const message = res.data.message
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          message: message,
          type: type
        })
        resolve(res.data)
      }).catch(err => {
        that.editLoading = false
        reject(err)
      })
    })
  })
}

export const apiDelete = (that, url, params) => {
  return new Promise((resolve, reject) => {
    that.$confirm('确认删除该记录吗?', '提示', {
      type: 'warning'
    }).then(() => {
      that.listLoading = true
      axios.delete(url, {
        params: params
      }).then(res => {
        that.listLoading = false
        const code = res.data.code
        const message = res.data.message
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          message: message,
          type: type
        })
        resolve(res.data)
      }).catch(err => {
        that.listLoading = false
        reject(err)
      })
    })
  })
}
export const apiDeleteCustom = (that, url, data, content) => {
  return new Promise((resolve, reject) => {
    that.$confirm(content, '提示', {
      type: 'warning'
    }).then(() => {
      that.listLoading = true
      axios.delete(url, {
        data: data
      }).then(res => {
        that.listLoading = false
        const code = res.data.code
        const message = res.data.message
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          message: message,
          type: type
        })
        resolve(res.data)
      }).catch(err => {
        that.listLoading = false
        reject(err)
      })
    })
  })
}
export const apiDeleteCustom1 = (that, url, params, content) => {
  return new Promise((resolve, reject) => {
    that.$confirm(content, '提示', {
      type: 'warning'
    }).then(() => {
      that.listLoading = true
      axios.delete(url, {
        params: params
      }).then(res => {
        that.listLoading = false
        const code = res.data.code
        const message = res.data.message
        const type = code == 0 ? 'success' : 'warning'
        that.$message({
          message: message,
          type: type
        })
        resolve(res.data)
      }).catch(err => {
        that.listLoading = false
        reject(err)
      })
    })
  })
}
