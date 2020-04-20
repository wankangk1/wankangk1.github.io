const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra")
const path = require("path")
module.exports = override(
  (config, env) => {
    // console.log(config)
    console.log("env:", env)
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
