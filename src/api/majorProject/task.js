import request from '@/utils/request'

//根据当前登录用户获取我的任务信息列表
export function getProjectTaskListByUser(data) {
  return request({
    url: '/project/task/getProjectTaskListByUser',
    method: 'get',
    data,
  })
}

//添加或修改任务信息
export function saveProjectTask(data) {
  return request({
    url: '/project/task/saveProjectTask',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//根据任务ID获取任务信息
export function getProjectTaskByTid(data) {
  return request({
    url: `/project/task/getProjectTaskByTid?tid=${data.tid}`,
    method: 'get',
    data,
  })
}

//删除任务信息
export function deleteProjectTaskById(data) {
  return request({
    url: '/project/task/deleteProjectTaskById',
    method: 'post',
    data,
  })
}
// 批量删除任务信息
export function deleteProjectTaskByIdList(data) {
  return request({
    url: '/project/task/deleteProjectTaskByIdList',
    method: 'post',
    data,
  })
}

// 根据事项ID获取任务列表（
export function getProjectTaskAllByMid(data) {
  return request({
    url: `/project/task/getProjectTaskAllByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

//删除任务完成信息
export function deleteProjectTaskCompleteyId(data) {
  return request({
    url: '/project/task/deleteProjectTaskCompleteyId',
    method: 'post',
    data,
  })
}
// 批量删除任务完成信息
export function deleteProjectTaskCompleteByIdList(data) {
  return request({
    url: '/project/task/deleteProjectTaskCompleteByIdList',
    method: 'post',
    data,
  })
}
//添加或修改任务完成记录信息
export function saveProjectTaskComplete(data) {
  return request({
    url: '/project/task/saveProjectTaskComplete',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
//根据任务ID获取任务完成信息
export function getProjectTaskCompleteByTid(data) {
  return request({
    url: `/project/task/getProjectTaskCompleteByTid?tid=${data.tid}`,
    method: 'get',
    data,
  })
}

// 根据上级任务ID获取子级任务信息列表
export function getProjectTaskByParentid(data) {
  return request({
    url: `/project/task/getProjectTaskByParentid?parentid=${data.parentid}`,
    method: 'get',
    data,
  })
}

// 根据任务ID获取导航信息
export function getProjectNavigationBarDtoByTid(data) {
  return request({
    url: `/project/task/getProjectNavigationBarDtoByTid?tid=${data.parentid}`,
    method: 'get',
    data,
  })
}

//根据上级任务ID获取子级任务信息列表(包含上上级ID)
export function getProjectTaskParentByParentid(data) {
  return request({
    url: `/project/task/getProjectTaskParentByParentid?parentid=${data.parentid}`,
    method: 'get',
    data,
  })
}

// 任务审核
export function examineProjectTask(data) {
  return request({
    url: '/project/task/examineProjectTask',
    method: 'post',
    data,
  })
}

// 根据事项ID获取第一级任务信息列表
export function getProjectTaskByMid(data) {
  return request({
    url: `/project/task/getProjectTaskByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

// 根据任务完成记录ID获取任务完成信息
export function getProjectTaskCompleteByTcid(data) {
  return request({
    url: `/project/task/getProjectTaskCompleteByTcid?tcid=${data.tcid}`,
    method: 'get',
    data,
  })
}
