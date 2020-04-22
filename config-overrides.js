const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  useEslintRc,
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
  }),
  useEslintRc() //使用eslinttrc，而不使用CRA附带的配置 https://github.com/arackaf/customize-cra/blob/master/api.md#useeslintrcconfigfile
)
