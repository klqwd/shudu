import request from '@/utils/request'

//根据年份获取各指标分类最新数据列表
export function getIndicatorTypeRecordListByYear(data) {
  return request({
    url: `/indicatorType/getIndicatorTypeRecordListByYear?pageNum=${data.pageNum}&pageSize=${data.pageSize}&year=${data.year}`,
    method: 'get',
    data,
  })
}

// 获取指标列表
export function getIndicatorTypeList(data) {
  return request({
    url: `/indicatorType/getIndicatorTypeList?dateType=${data.dateType}&indicatorName=${data.indicatorName}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&unit=${data.unit}`,
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
