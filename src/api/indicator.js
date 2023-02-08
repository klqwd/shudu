import request from '@/utils/request'

// 获取指标列表
export function getIndicatorTypeList(data) {
  return request({
    url: `/indicatorType/getIndicatorTypeList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 添加指标
export function createIndicator(data) {
  return request({
    url: '/indicatorType/create',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//删除指标
export function deleteIndicator(data) {
  return request({
    url: `/indicatorType/deleteById?tid=${data.tid}`,
    method: 'get',
    data,
  })
}

// 根据指标分类获取指标填报数据
export function getIndicatorRecordListByTid(data) {
  return request({
    url: `/indicatorType/getIndicatorRecordListByTid?pageNum=${data.pageNum}&pageSize=${data.pageSize}&tid=${data.tid}&year=${data.year}`,
    method: 'get',
    data,
  })
}

//根据指标分类ID获取指标详情信息
export function getIndicatorTypeByTid(data) {
  return request({
    url: '/indicatorType/getIndicatorTypeByTid',
    method: 'get',
    data,
  })
}

// 获取当前用户待办记录列表
export function getListByUid(data) {
  return request({
    url: `/indicatorType/getListByUid?dateType=${data.dateType}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&indicatorName=${data.indicatorName}&unit=${data.unit}`,
    method: 'get',
    data,
  })
}

// 修改指标
export function updateIndicator(data) {
  return request({
    url: '/indicatorType/update',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//填报指标
export function updateIndicatorRecord(data) {
  return request({
    url: '/indicatorType/updateIndicatorRecord',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 根据机构ID获取下级机构列表
export function getUserOrganListByParentid(data) {
  return request({
    url: `/userOrgan/getUserOrganListByParentid?pageNum=${data.pageNum}&pageSize=${data.pageSize}&parentid=${data.parentid}`,
    method: 'get',
    data,
  })
}

//获取用户列表
export function getUserList(data) {
  return request({
    url: `/user/getUserList?gid=${data.gid}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

//获取所有指标填报数据
export function getIndicatorRecordList(data) {
  return request({
    url: `/indicatorType/getIndicatorRecordList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&dateType=${data.dateType}&indicatorName=${data.indicatorName}&unit=${data.unit}`,
  })
}
