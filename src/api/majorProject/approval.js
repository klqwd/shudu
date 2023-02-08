import request from '@/utils/request'

//删除审批信息
export function deleteProjectApprovalById(data) {
  return request({
    url: '/project/approval/deleteProjectApprovalById',
    method: 'post',
    data,
  })
}

// 根据审批记录ID获取审批信息
export function getProjectApprovalByPpid(data) {
  return request({
    url: '/project/approval/getProjectApprovalByPpid',
    method: 'get',
    data,
  })
}

//根据事项ID获取审批列表
export function getProjectApprovalListByMid(data) {
  return request({
    url: `/project/approval/getProjectApprovalListByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

//添加或修改审批信息
export function saveProjectApproval(data) {
  return request({
    url: '/project/approval/saveProjectApproval',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 批量删除审批信息
export function deleteProjectApprovalByIdList(data) {
  return request({
    url: '/project/approval/deleteProjectApprovalByIdList',
    method: 'post',
    data,
  })
}
