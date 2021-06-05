import request from '../utils/request'

export function getStatistics(stTime, enTime) {
  return request({
    url: `/editcount`,
    method: 'get',
    params: { startTime: stTime, endTime: enTime }
  })
}
