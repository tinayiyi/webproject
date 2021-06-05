import request from '../utils/request'

export function getReportList() {
  return request({
    url: `/jubao`,
    method: 'get'
  })
}
export function toApproval(data) {
  return request({
    url: `/jubao`,
    method: 'put',
    data
  })
}
