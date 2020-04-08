import axios from "axios"
import {message} from "antd"
// const nativeHost = window.location.protocol + "//" + window.location.host
// const isEnvProduction = process.env.NODE_ENV === "production"
const isEnvDevelopment = process.env.NODE_ENV === "development"
const axiosInstance = axios.create({
  baseURL: isEnvDevelopment ? "/api" : "https://api.github.com",
  // 自定义请求头信息
  headers: {
    // "X-Requested-With": "XMLHttpRequest",
    // "Content-Type": "application/json;charset=utf-8",
    // Accept: "application/vnd.github.v3+json",
    // clientType: "web",
    // version: process.env.version,
    // sysCode: "new-gwy",
    "User-Agent": "",
    Accept: "application/vnd.github.v3+json",
    Authorization: "token 3b643099c6fd86e60b00d1538b6fe84774646bc8",
  },
  // 超时时间
  timeout: 30000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(process.env)
    const gitParams = {
      //   client_id: isEnvDevelopment ? "82ba62414d6f13e2768f" : "",
      //   client_secret: isEnvDevelopment?"4ae1979b414a7fe5026696a6780c0e987e17cf00":"",
    }
    config.params = {
      ...config.params,
      ...gitParams,
    }
    return config
  },
  (error) => {
    message.error(error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (resp) => {
    console.log(resp)
    return resp
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
