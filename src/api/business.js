import request from '../utils/request'

export function getDataList(params) {
  return request({
    url: `/mgrzhaoshang`,
    method: 'get',
    params: params
  })
}

export function insertData(data) {
  return request({
    url: `/mgrzhaoshang`,
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: `/mgrzhaoshang`,
    method: 'put',
    data
  })
}
export function deleteData(id) {
  return request({
    url: `/mgrzhaoshang`,
    method: 'delete',
    data: { id }
  })
}
