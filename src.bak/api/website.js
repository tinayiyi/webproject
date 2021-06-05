import request from '../utils/request'

export function getWebsite(queryinfo) {
  return request({
    url: `/editwebsite`,
    method: 'get',
    params: queryinfo
  })
}

export function postWebsite(data, forceSubmit) {
  return request({
    url: `/editwebsite`,
    method: 'post',
    data: { data, forceSubmit }
  })
}

export function usedFlag(from) {
  return request({
    url: `/editwebsite`,
    method: 'put',
    data: from
  })
}

export function deleteWebsite(id) {
  return request({
    url: `/editwebsite`,
    method: 'delete',
    data: {
      id: id
    }
  })
}
