import http from "@/utils/http"

// 封装登录接口
export const getLogin = (params) => http.post(http.adornUrl("/sys/login"), params).then((res) => res.data)
