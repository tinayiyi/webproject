import request from '../utils/requsetvid'

export function SelectAllVideo(pages) {
  return request({
    url: `/roadshow/getAllRoadshowList.shtml`,
    method: 'post',
    params: {
      perComType: 0,
      newRoadshowType: '',
      roadshowDate: '',
      page: pages,
      rows: 10
    }
  })
}

export function GetVideoUrl(pid) {
  return request({
    url: `/controller/roadshowCampaignPager/getRoadshowInfo.shtml`,
    method: 'post',
    params: { roadshowId: pid }
  })
}
