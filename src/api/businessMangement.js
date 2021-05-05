import request from '@/utils/request'
// 获取企业信息
export function businessInfoApi(params) {
  return request({
    url: 'business/qiye/list',
    method: 'get',
    params
  })
}
// 获取企业信息详情
export function businessDetailApi(params) {
  return request({
    url: 'business/qiye/getOne',
    method: 'get',
    params
  })
}
// 企业信息新增
export function businessAddApi(data) {
  return request({
    url: 'business/qiye/add',
    method: 'post',
    data
  })
}
// 企业信息修改
export function businessEditApi(data) {
  return request({
    url: 'business/qiye/edit',
    method: 'put',
    data
  })
}
// 企业信息删除
export function deleteBusinessInfoApi(data) {
  return request({
    url: 'business/qiye/deleteQiYeBusiness',
    method: 'delete',
    data
  })
}
// 获取企业信息变更记录
export function businessInfoChangeListApi(params) {
  return request({
    url: '/business/qiye/changeHistoryList',
    method: 'get',
    params
  })
}
// 企业信息导入
export function businessImportantApi(data) {
  return request({
    url: '/business/qiye/import',
    method: 'post',
    data
  })
}
// 企业信息导出
export function businessExportApi(params) {
  return request({
    url: 'business/qiye/export',
    method: 'get',
    params
  })
}
// 新增企业回访记录
export function addVisitrecordApi(data) {
  return request({
    url: '/business/qiye/addReturnVisit',
    method: 'post',
    data
  })
}
// 加入防流失企业
export function addFangLiuShiApi(data) {
  return request({
    url: '/business/qiye/addFangLiuShi',
    method: 'post',
    data
  })
}
