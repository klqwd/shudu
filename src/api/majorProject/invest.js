import request from '@/utils/request'

//删除投资完成信息
export function deleteProjectInvestmentCompleteById(data) {
  return request({
    url: '/project/investment/deleteProjectInvestmentCompleteById',
    method: 'post',
    data,
  })
}

//删除投资计划信息
export function deleteProjectInvestmentPlanById(data) {
  return request({
    url: '/project/investment/deleteProjectInvestmentPlanById',
    method: 'post',
    data,
  })
}

//根据投资计划ID获取投资完成信息
export function getProjectInvestmentCompleteByIpid(data) {
  return request({
    url: `/project/investment/getProjectInvestmentCompleteByIpid?ipid=${data.ipid}`,
    method: 'get',
    data,
  })
}

//根据事项ID获取投资完成列表
export function getProjectInvestmentCompleteByMid(data) {
  return request({
    url: `/project/investment/getProjectInvestmentCompleteByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

//根据投资计划ID获取投资计划信息
export function getProjectInvestmentPlanByIpid(data) {
  return request({
    url: `/project/investment/getProjectInvestmentPlanByIpid?ipid=${data.ipid}`,
    method: 'get',
    data,
  })
}

//根据事项ID获取投资计划列表
export function getProjectInvestmentPlanByMid(data) {
  return request({
    url: `/project/investment/getProjectInvestmentPlanByMid?mid=${data.mid}`,
    method: 'get',
    data,
  })
}

//添加或修改投资完成信息
export function saveProjectInvestmentComplete(data) {
  return request({
    url: '/project/investment/saveProjectInvestmentComplete',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//添加或修改投资计划信息
export function saveProjectInvestmentPlan(data) {
  return request({
    url: '/project/investment/saveProjectInvestmentPlan',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 批量删除投资计划信息
export function deleteProjectInvestmentPlanByIdList(data) {
  return request({
    url: '/project/investment/deleteProjectInvestmentPlanByIdList',
    method: 'post',
    data,
  })
}
//批量删除投资完成信息
export function deleteProjectInvestmentCompleteByIdList(data) {
  return request({
    url: '/project/investment/deleteProjectInvestmentCompleteByIdList',
    method: 'post',
    data,
  })
}
