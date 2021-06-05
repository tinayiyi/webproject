import request from '../utils/request'

export function addPac(form) {
  return request({
    url: `/packageVersion`,
    method: 'post',
    data: form
  })
}

export function editPac(form) {
  return request({
    url: `/packageVersion`,
    method: 'put',
    data: form
  })
}

export function deletePac(id) {
  return request({
    url: `/packageVersion`,
    method: 'delete',
    data: { id: id }
  })
}

export function getPac(data) {
  return request({
    url: `/packageVersion`,
    method: 'get',
    params: data
  })
}
