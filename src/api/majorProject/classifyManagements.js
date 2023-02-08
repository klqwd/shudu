import request from '@/utils/request'
// import qs from 'qs'

//获取项目分类列表
export function getProjectTypeList(data) {
  return request({
    url: `/project/info/getProjectTypeList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 删除项目分类
export function deleteProjectTypeById(data) {
  return request({
    url: '/project/info/deleteProjectTypeById',
    method: 'post',
    data,
  })
}

// 添加或修改项目分类
export function saveProjectType(data) {
  return request({
    url: '/project/info/saveProjectType',
    method: 'post',
    data,
    // data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//根据创建人ID获取重大项目列表
export function getProjectListByCreateUser(data) {
  return request({
    url: `/project/info/getProjectListByCreateUser?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data,
  })
}

// 添加或修改重大项目
export function saveProject(data) {
  return request({
    url: '/project/info/saveProject',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 删除重大项目
export function deleteProjectById(data) {
  return request({
    url: '/project/info/deleteProjectById',
    method: 'post',
    data,
  })
}

// 批量删除项目
export function deleteProjectTypeByPtidList(data) {
  console.log(data, 444)
  return request({
    url: '/project/info/deleteProjectTypeByPtidList',
    method: 'post',
    data: data,
  })
}

// 批量删除重大项目
export function deleteProjectByIdList(data) {
  return request({
    url: '/project/info/deleteProjectByIdList',
    method: 'post',
    data,
  })
}
