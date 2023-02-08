import request from '@/utils/request'

// 获取重大项目列表
export function getWorkProjectList(data) {
  return request({
    url: `/work/project/getWorkProjectList?isFollow=${data.isFollow}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 获取重大项目统计数据
export function getWorkProjectStatistics(data) {
  return request({
    url: '/work/project/getWorkProjectStatistics',
    method: 'get',
    data,
  })
}

// 根据事项ID任务分解信息
export function getProjectTaskAllByMid(data) {
  return request({
    url: `/work/project/getProjectTaskAllByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

// 事项关注
export function saveFollowMatter(data) {
  return request({
    url: '/work/project/saveFollowMatter',
    method: 'post',
    data,
  })
}

//事项取消关注
export function delFollowMatter(data) {
  return request({
    url: '/work/project/delFollowMatter',
    method: 'post',
    data,
  })
}
