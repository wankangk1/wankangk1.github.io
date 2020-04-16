const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra")
const path = require("path")
module.exports = override(
  (config, env) => {
    console.log(config, "env:", env)
    config.devtool =
      env === "production" ? "cheap-module-source-map" : config.devtool  
    return config
  },
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: {"@primary-color": "#1DA57A"}
  }),
  addWebpackAlias({
    src: path.resolve(__dirname, "src"),
  })
)
