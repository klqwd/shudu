import request from '@/utils/request'

//删除节点信息
export function deleteProjectNodeById(data) {
  return request({
    url: '/project/node/deleteProjectNodeById',
    method: 'post',
    data,
  })
}

//删除节点进度信息
export function deleteProjectNodePlanyId(data) {
  return request({
    url: '/project/node/deleteProjectNodePlanyId',
    method: 'post',
    data,
  })
}

// 批量删除节点信息
export function deleteProjectNodeByNidList(data) {
  return request({
    url: '/project/node/deleteProjectNodeByNidList',
    method: 'post',
    data,
  })
}

// 批量删除节点进度信息
export function deleteProjectNodePlanByNpIdList(data) {
  return request({
    url: '/project/node/deleteProjectNodePlanByNpIdList',
    method: 'post',
    data,
  })
}

//根据事项ID获取节点信息列表
export function getProjectNodeByMid(data) {
  return request({
    url: `/project/node/getProjectNodeByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

// 根据节点ID获取节点信息
export function getProjectNodeByNid(data) {
  return request({
    url: `/project/node/getProjectNodeByNid?nid=${data.nid}`,
    method: 'get',
    data,
  })
}

//根据事项ID获取节点进度列表
export function getProjectNodePlanByMid(data) {
  return request({
    url: `/project/node/getProjectNodePlanByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

//根据节点ID获取节点进度信息
export function getProjectNodePlanByNid(data) {
  return request({
    url: `/project/node/getProjectNodePlanByNid?nid=${data.nid}`,
    method: 'get',
    data,
  })
}

// 根据节点进度ID获取节点进度信息
export function getProjectNodePlanByNpid(data) {
  return request({
    url: '/project/node/getProjectNodePlanByNpid',
    method: 'get',
    data,
  })
}

//添加或修改节点信息
export function saveProjectNode(data) {
  return request({
    url: '/project/node/saveProjectNode',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 添加或修改节点进度信息
export function saveProjectNodePlan(data) {
  return request({
    url: '/project/node/saveProjectNodePlan',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
