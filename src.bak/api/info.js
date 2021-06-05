import request from '../utils/request'

export function getInfoList(params) {
  return request({
    url: `/mgrzixun`,
    method: 'get',
    params: params
  })
}

export function addInfoList(data, forceSubmit) {
  return request({
    url: `/mgrzixun`,
    method: 'post',
    data: { data, forceSubmit }
  })
}

export function editInfoList(params) {
  return request({
    url: `/mgrzixun`,
    method: 'put',
    data: params
  })
}

export function deleteInfoList(mid) {
  return request({
    url: `/mgrzixun`,
    method: 'delete',
    params: { mid }
  })
}

export function changeHideType(hide, unhide) {
  return request({
    url: `/mgrzixun/hide`,
    method: 'put',
    data: {
      hide: hide,
      unhide: unhide
    }
  })
}
