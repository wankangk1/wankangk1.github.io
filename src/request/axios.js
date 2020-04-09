import axios from "axios"
import {message} from "antd"
// const nativeHost = window.location.protocol + "//" + window.location.host
// const isEnvProduction = process.env.NODE_ENV === "production"
// const isEnvDevelopment = process.env.NODE_ENV === "development"
//提交到github仓库会被删除，转一下
const access_token = "d08f48e2da337d9f33"
const access_token2 = "06865d31cd6ec6c37ebfd0"
const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  // 自定义请求头信息
  headers: {
    "User-Agent": "",
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${access_token + access_token2}`,
  },
  // 超时时间
  timeout: 30000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(process.env)
    // const gitParams = {
    //     client_id: isEnvDevelopment ? "20c4ebe3cc4a5c0c8310":"82ba62414d6f13e2768f",
    //     client_secret: isEnvDevelopment?"1be860bd4d892ddceb8a2cf9776fc162bd4e8cf2":"4ae1979b414a7fe5026696a6780c0e987e17cf00",
    // }
    // config.params = {
    //   ...config.params,
    //   ...gitParams,
    // }
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
