import request from '@/utils/request'

// 根据paraType查询对应参数集合
export function findType(params) {
  return request({
    url: 'parameterInfo/findType',
    method: 'get',
    params
  })
}
