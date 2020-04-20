import axios from "axios"
import { message } from "antd"
// const nativeHost = window.location.protocol + "//" + window.location.host
// const isEnvProduction = process.env.NODE_ENV === "production"
const isEnvDevelopment = process.env.NODE_ENV === "development"
/*
  防止重复提交，使用axios里的构造函数CancelToken
*/
let requestList = [] //声明一个数组用于存储每个ajax请求的取消函数和ajax标识

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  // 自定义请求头信息
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
  // 超时时间
  timeout: 30000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config,config.params)
    config.cancelToken = new axios.CancelToken((cancelRequest) => {
      //请求标记
      let requestFlag =
        JSON.stringify(config.url) +
        JSON.stringify(config.data) +
        "&" +
        config.method
      if (requestList.includes(requestFlag)) {
        //取消请求
        cancelRequest("取消重复请求")
      } else {
        requestList.push(requestFlag)
      }
    })
    const gitParams = {
      client_id: isEnvDevelopment
        ? "20c4ebe3cc4a5c0c8310"
        : "82ba62414d6f13e2768f",
      client_secret: isEnvDevelopment
        ? "1be860bd4d892ddceb8a2cf9776fc162bd4e8cf2"
        : "4ae1979b414a7fe5026696a6780c0e987e17cf00",
    }
    config.params = {
      ...config.params,
      ...gitParams,
    }
    const token = sessionStorage.getItem(global.token)
    if (token) {
      config.headers["Authorization"] = token
    }
    // const access_token = "244365709957451a34df998a6dd70f5c6069cf51"
    return config
  },
  (error) => {
    message.error(error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    //请求结束，标记清除
    
    let requestFlag =
      JSON.stringify(response.config.url) +
      JSON.stringify(response.config.data) +
      "&" +
      response.config.method
    requestList.splice(
      requestList.findIndex((item) => item === requestFlag),
      1
    )

    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
