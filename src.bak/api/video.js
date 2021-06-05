import request from '../utils/request'

export function getTypeList() {
  return request({
    url: `/hall/videotype`,
    method: 'get'
  })
}

export function getvideoList(params) {
  let page = params.page
  let limit = params.limit
  let hidetype = params.hidetype
  return request({
    url: `/mgrvideo`,
    method: 'get',
    params: {
      limit: limit,
      page: page,
      hidetype: hidetype
    }
  })
}

export function addvideoList(details) {
  return request({
    url: `/mgrvideo`,
    method: 'post',
    data: { details }
  })
}

export function updatevideoList(details) {
  return request({
    url: `/mgrvideo`,
    method: 'put',
    data: { details }
  })
}

export function deletevideoList(mid) {
  return request({
    url: `/mgrvideo`,
    method: 'delete',
    params: { mid }
  })
}

export function changeHideType(hide, unhide) {
  return request({
    url: `/mgrvideo/hide`,
    method: 'put',
    data: {
      hide: hide,
      unhide: unhide
    }
  })
}
