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
export function getSelectList() {
  return request({
    url: '/hall/videotype',
    method: 'get'
  })
}
export function getHideData(params) {
  let page = params.page
  let limit = params.limit
  let keyword = params.keyword
  return request({
    url: `/mgrzhaoshang`,
    method: 'get',
    params: {
      limit: limit,
      page: page,
      keyword: keyword,
      hidetype: 'hide'
    }
  })
}
export function changeHideType(hide, unhide) {
  return request({
    url: `/mgrzhaoshang/hide`,
    method: 'put',
    data: {
      hide: hide,
      unhide: unhide
    }
  })
}
