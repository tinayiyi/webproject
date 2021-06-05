import request from '../utils/request'

export function Login(params) {
  return request({
    url: `/manager/login`,
    method: 'post',
    data: params
  })
}

export function getUserList() {
  return request({
    url: `/manager`,
    method: 'get'
  })
}

export function AddUser(params) {
  return request({
    url: `/manager`,
    method: 'post',
    data: params
  })
}

export function DeleteUser(id) {
  return request({
    url: `/manager`,
    method: 'delete',
    params: { id }
  })
}

export function EditUsers(params) {
  return request({
    url: `/manager`,
    method: 'put',
    data: params
  })
}

export function Distribution(params) {
  return request({
    url: `/manager/limits`,
    method: 'put',
    data: params
  })
}
