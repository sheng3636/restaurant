/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return str.trim()
  // const valid_map = ['admin', 'editor','superadmin']
  // return valid_map.indexOf(str.trim()) >= 0
}
export function isTyshxydm(str) {
  return /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g.test(str)
}

// 验证密码密码，4-12位字母、数字、特殊符号和下划线组成
// 请输入8-16位字符，至少包含数字、大写字母、小写字母、特殊字符中的三种类型
export function isValidPaVss(str) {
  // const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,12}$/
  const reg = /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,16}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,16}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,16}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,16}$))/
  return reg.test(str)
}