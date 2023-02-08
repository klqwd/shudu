import request from '@/utils/request'

export function login(data) {
  return request({
    url: `/login/login?username=${data.username}&password=${data.password}`,
    method: 'post',
  })
}

export function getUserInfo() {
  return request({
    url: '/userInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}
