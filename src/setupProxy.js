const {createProxyMiddleware} = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.github.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      secure: false, //代理https接口 需要配置这个参数为true
    })
  )
}
