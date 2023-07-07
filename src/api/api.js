import http from "@/utils/http"

// 封装登录接口
export const getLogin = (data) => http.post(http.adornUrl("/sys/login"), data).then((res) => res.data)
// 获取用户基本资料
export const getProfile = () => http.post(http.adornUrl("/sys/profile")).then((res) => res.data)
// 获取员工列表
export const getUser = (params) => http.get(http.adornUrl("/sys/user"), { params }).then((res) => res.data)
