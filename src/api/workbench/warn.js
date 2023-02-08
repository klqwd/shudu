import request from '@/utils/request'

// 获取预警事项列表
export function getWarningMatterList(data) {
  return request({
    url: `/work/project/getWarningMatterList?isFollow=${data.isFollow}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}
