import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

//日志设置
export function getLogging(params) {
  return request({
    url: '/system/logging',
    method: 'get',
    params
  })
}

//参数设置
export function getParameter(params) {
  return request({
    url: '/system/parameterInfo',
    method: 'get',
    params
  })
}
//参数设置获取
export function getParameterByParameters(params) {
  return request({
    url: '/system/parameterInfo/getParameterByParameterType',
    method: 'get',
    params
  })
}
export function saveParameter(params) {
  return request({
    url: '/system/parameterInfo',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}

export function editParameter(params) {
  return request({
    url: '/system/parameterInfo',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function deleteParameter(params) {
  return request({
    url: '/system/parameterInfo',
    method: 'delete',
    params,
  })
}

//业务参数设置
export function getParameterBusiness(params) {
  return request({
    url: '/parameterInfo/parameterBusiness',
    method: 'get',
    params
  })
}
export function addParameterBusiness(params) {
  return request({
    url: '/parameterInfo/parameterBusiness',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function editParameterBusiness(params) {
  return request({
    url: '/parameterInfo/parameterBusiness',
    method: 'put',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function deleteParameterBusiness(params) {
  return request({
    url: '/parameterInfo/parameterBusiness',
    method: 'delete',
    params,
  })
}
//参数设置获取
export function getParameterBuinessByParameterType(params) {
  return request({
    url: '/parameterInfo/findType',
    method: 'get',
    params
  })
}
//楼宇信息获取
export function getLouYuListByParameter(params) {
  return request({
    url: '/business/louyu/list',
    method: 'get',
    params,
  })
}
//企业信息获取
export function getQiYeListByParameter(params) {
  return request({
    url: '/business/qiye/list',
    method: 'get',
    params,
  })
}
//企业信息获取
export function getQiYeByParameter(params) {
  return request({
    url: '/business/qiye/getOne',
    method: 'get',
    params,
  })
}
//企业信息删除
export function deleteQiYeBusinessParameter(params) {
  return request({
    url: '/business/qiye/deleteQiYeBusiness',
    method: 'delete',
    params,
  })
}
export function addQiYe(params) {
  return request({
    url: '/business/qiye/add',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function editQiYe(params) {
  return request({
    url: '/business/qiye/edit',
    method: 'put',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function importQiYe(params) {
  return request({
    url: '/business/qiye/import',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function exportQiYe(params) {
  return request({
    url: '/business/qiye/export',
    method: 'get',
    responseType:'blob',
    params
  })
}
//企业变更记录获取
export function getQiYechangeHistoryListByParameter(params) {
  return request({
    url: '/business/qiye/changeHistoryList',
    method: 'get',
    params,
  })
}

//新增防流失
export function addFangLiuShi(params) {
  return request({
    url: '/business/qiye/addFangLiuShi',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
//企业流失情况历史list
export function getCompnayLossHistoryListByParameter(params) {
  return request({
    url: '/business/qiye/lossHistoryList',
    method: 'get',
    params,
  })
}
//新增企业回访
export function addHuiFang(params) {
  return request({
    url: '/business/qiye/addReturnVisit',
    method: 'post',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
//企业回访list
export function getQiYeHuiFangListByParameter(params) {
  return request({
    url: '/business/qiye/returnVisit/list',
    method: 'get',
    params,
  })
}
//企业信息删除
export function deleteReturnVisitBusinessParameter(params) {
  return request({
    url: '/business/qiye/returnVisit/deleteBusiness',
    method: 'delete',
    params,
  })
}

//政策信息查看
export function getPrlicyList(params) {
  return request({
    url: '/business/file/select',
    method: 'get',
    params,
  })
}

//政策信息删除
export function deletePrlicy(params) {
  return request({
    url: '/business/file/delete',
    method: 'delete',
    params,
  })
}


//菜单
export function getMenuTree(params) {
  return request({
    url: '/system/menu/tree',
    method: 'get',
    params
  })
}
export function menuDetailById(params) {
  return request({
    url: '/system/menu/menuDetailById',
    method: 'get',
    params
  })
}
export function addMenuTree(params) {
  return request({
    url: '/system/menu',
    method: 'post',
    data: params
  })
}
export function editMenuTree(params) {
  return request({
    url: '/system/menu',
    method: 'put',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function deletetMenuTree(params) {
  return request({
    url: '/system/menu',
    method: 'delete',
    params,
  })
}
//菜单权限
export function getMenuAuthority(params) {
  return request({
    url: '/system/functionAuthority/getMenuAuthority',
    method: 'get',
    params
  })
}
export function getAuthTable(params) {
  return request({
    url: '/system/functionAuthority/authTable',
    method: 'get',
    params
  })
}
export function addAuth(params) {
  return request({
    url: '/system/functionAuthority',
    method: 'post',
    data: params
  })
}
export function editAuth(params) {
  return request({
    url: '/system/functionAuthority',
    method: 'put',
    data: params,
    headers: {'Content-Type': 'application/json'}
  })
}
export function deletetAuth(params) {
  return request({
    url: '/system/functionAuthority',
    method: 'delete',
    params,
  })
}
