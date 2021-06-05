import request from '../utils/request'

export function getMeetList(params) {
  let page = params.page
  let limit = params.limit
  let keyword = params.keyword
  let hidetype = params.hidetype
  return request({
    url: `/mgractivity`,
    method: 'get',
    params: {
      limit: limit,
      page: page,
      keyword: keyword,
      hidetype: hidetype
    }
  })
}

export function getTitleSimilarity(data, type) {
  return request({
    url: `/titleSimilarity`,
    method: 'get',
    params: { data, type }
  })
}

export function addData(maininfo, details, forceSubmit) {
  let hide = 1
  return request({
    url: `/mgractivity`,
    method: 'post',
    data: { maininfo, details, hide, forceSubmit }
  })
}

export function editData(maininfo, details) {
  return request({
    url: `/mgractivity`,
    method: 'put',
    data: { maininfo, details }
  })
}

export function deleteData(mid) {
  return request({
    url: `/mgractivity`,
    method: 'delete',
    params: { mid }
  })
}

export function getImgToken() {
  return request({
    url: `/qiniu/uptoken`,
    method: 'get'
  })
}

export function getSelectList() {
  return request({
    url: '/hall/videotype',
    method: 'get'
  })
}

export function getVagueData(params) {
  let page = params.page
  let limit = params.limit
  let keyword = params.keyword
  let hidetype = params.hidetype
  return request({
    url: `/mgractivity`,
    method: 'get',
    params: {
      limit: limit,
      page: page,
      keyword: keyword,
      hidetype: hidetype
    }
  })
}

export function getHideData(params) {
  let page = params.page
  let limit = params.limit
  let keyword = params.keyword
  return request({
    url: `/mgractivity`,
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
    url: `/mgractivity/hide`,
    method: 'put',
    data: {
      hide: hide,
      unhide: unhide
    }
  })
}
