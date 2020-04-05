import axios from "axios"
import { message } from "antd"

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  // 自定义请求头信息
  headers: {
    // "X-Requested-With": "XMLHttpRequest",
    // "Content-Type": "application/json;charset=utf-8",
    // Accept: "application/vnd.github.v3+json",
    // clientType: "web",
    // version: process.env.version,
    // sysCode: "new-gwy",
    Accept:"application/vnd.github.v3+json",
    Authorization: "access_token b7f94eb41e051dd7a2f2b9988ec1e8f659e1ad16"
  },
  // 超时时间
  timeout: 30000,
 
})

axiosInstance.interceptors.request.use(
  (config) => {
    debugger
    return config
  },
  (error) => {
    message.error(error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (resp) => {
    return resp
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
