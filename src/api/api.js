import http from "@/utils/http"

// 封装登录接口
export const getLogin = (data) => http.post(http.adornUrl("/sys/login"), data).then((res) => res.data)
// 获取用户基本资料
export const getProfile = () => http.post(http.adornUrl("/sys/profile")).then((res) => res.data)
// 获取员工列表
export const getUser = (params) => http.get(http.adornUrl("/sys/user"), { params }).then((res) => res.data)
// 加班离职接口
export const getStartProcess = (data) =>
  http.post(http.adornUrl("/user/process/startProcess"), data).then((res) => res.data)

// 获取组织架构数据
export const getDepartment = (params) =>
  http.get(http.adornUrl("/company/department"), { params }).then((res) => res.data)
// 新增部门
export const addDepartment = (data) => http.post(http.adornUrl("/company/department"), data).then((res) => res.data)
// 获取员工简单列表
export const getSimple = (params) => http.get(http.adornUrl("/sys/user/simple"), { params }).then((res) => res.data)
// 查看部门详情
export const lookdepartment = (params) =>
  http.get(http.adornUrl(`/company/department/${params.id}`), { params }).then((res) => res.data)
// 删除部门
export const delDepartment = (data) => http.delete(http.adornUrl(`/company/department/${data.id}`), data)

// 获取权限管理数据
export const getPermission = (params) => http.get(http.adornUrl("/sys/permission"), { params }).then((res) => res.data)
// 添加权限点
export const addPermission = (data) => http.post(http.adornUrl("/sys/permission"), data).then((res) => res.data)
// 查看权限详情
export const LookPermission = (params) =>
  http.get(http.adornUrl(`/sys/permission/${params.id}`), { params }).then((res) => res.data)
