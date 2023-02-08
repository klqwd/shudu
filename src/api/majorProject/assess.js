import request from '@/utils/request'

// 删除考核事项
export function deleteExamineById(data) {
  return request({
    url: '/examine/info/deleteExamineById',
    method: 'post',
    data,
  })
}

// 删除考核事项分类
export function deleteExamineTypeById(data) {
  return request({
    url: '/examine/info/deleteExamineTypeById',
    method: 'post',
    data,
  })
}

// 根据事项ID获取考核事项详细信息
export function getExamineByMid(data) {
  return request({
    url: `/examine/info/getExamineByMid?mtid=${data.mtid}`,
    method: 'get',
    data,
  })
}

// 获取考核事项列表
export function getExamineList(data) {
  return request({
    url: `/examine/info/getExamineList?matterName=${data.matterName}&matterNum=${data.matterNum}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 根据创建人ID获取考核事项列表
export function getExamineListByCreateUser(data) {
  return request({
    url: `/examine/info/getExamineListByCreateUser?pageNum=${data.pageNum}&pageSize=${data.pageSize}&matterName=${data.matterName}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 根据责任人ID获取考核事项列表
export function getExamineListByUid(data) {
  return request({
    url: `/examine/info/getExamineListByUid?pageNum=${data.pageNum}&pageSize=${data.pageSize}&matterName=${data.matterName}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 删除考核事项分类
export function getExamineTypeByEtid(data) {
  return request({
    url: `/examine/info/getExamineTypeByEtid?etid=${data.etid}`,
    method: 'get',
    data,
  })
}

// 获取考核事项分类列表
export function getExamineTypeList(data) {
  return request({
    url: `/examine/info/getExamineTypeList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 添加或修改考核事项
export function saveExamine(data) {
  return request({
    url: '/examine/info/saveExamine',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 添加或修改考核事项分类
export function saveExamineType(data) {
  return request({
    url: '/examine/info/saveExamineType',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
