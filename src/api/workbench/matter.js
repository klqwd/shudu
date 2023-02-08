import request from '@/utils/request'

// 添加或修改重大事项分类
export function saveMatterType(data) {
  return request({
    url: '/matter/info/saveMatterType',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 获取重大事项分类列表
export function getMatterTypeList(data) {
  return request({
    url: `/matter/info/getMatterTypeList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 获取重大事项列表
export function getMatterList(data) {
  return request({
    url: `/matter/info/getMatterList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&matterName=${data.matterName}&matterNum=${data.matterNum}`,
    method: 'get',
    data,
  })
}

// 根据创建人ID获取重大事项列表
export function getMatterListByCreateUser(data) {
  return request({
    url: '/matter/info/getMatterListByCreateUser',
    method: 'get',
    data,
  })
}

// 根据责任人ID获取重大事项列表
export function getMatterListByUid(data) {
  return request({
    url: `/matter/info/getMatterListByUid?pageNum=${data.pageNum}&pageSize=${data.pageSize}&matterName=${data.matterName}&matterNum=${data.matterNum}`,
    method: 'get',
    data,
  })
}

// 根据重大事项分类ID获取重大事项分类信息

// export function getMatterTypeByMtid(data) {
//   return request({
//     url: `/matter/info/getMatterTypeByMtid?mid${data.mtid}`,
//     method: 'get',
//     data,
//   })
// }

// 删除重大事项分类
export function deleteMatterTypeById(data) {
  return request({
    url: '/matter/info/deleteMatterTypeById',
    method: 'post',
    data,
  })
}

// 删除重大事项
export function deleteMatterById(data) {
  return request({
    url: '/matter/info/deleteMatterById',
    method: 'post',
    data,
  })
}

// 根据重大事项分类ID获取重大事项分类信息
export function getMatterTypeByMtid(data) {
  return request({
    url: `/matter/info/getMatterTypeByMtid?mtid=${data.mtid}`,
    method: 'get',
    data,
  })
}
// 根据事项ID获取重大事项详细信息
export function getMatterByMid(data) {
  return request({
    url: '/matter/info/getMatterByMid',
    method: 'get',
    data,
  })
}

// 添加或修改重大事项
export function saveMatter(data) {
  return request({
    url: '/matter/info/saveMatter',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// // 获取重大事项列表
// export function getMatterList(data) {
//   return request({
//     url: '/matter/info/getMatterList',
//     method: 'get',
//     data,
//   })
// }
