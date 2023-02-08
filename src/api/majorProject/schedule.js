import request from '@/utils/request'

//删除进度信息
export function deleteProjectProgressById(data) {
  return request({
    url: '/project/progress/deleteProjectProgressById',
    method: 'post',
    data,
  })
}

//根据进度记录ID获取进度信息
export function getProjectProgressByPpid(data) {
  return request({
    url: '/project/progress/getProjectProgressByPpid',
    method: 'get',
    data,
  })
}

//根据事项ID获取进度列表
export function getProjectProgressListByMid(data) {
  return request({
    url: `/project/progress/getProjectProgressListByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

//添加或修改进度信息
export function saveProjectProgress(data) {
  return request({
    url: '/project/progress/saveProjectProgress',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 批量删除进度信息
export function deleteProjectProgressByIdList(data) {
  return request({
    url: '/project/progress/deleteProjectProgressByIdList',
    method: 'post',
    data,
  })
}
