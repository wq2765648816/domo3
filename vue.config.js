const { defineConfig } = require("@vue/cli-service")
// console.log(process)
const target =
  process.env.VUE_APP_MOCK_SCHEAM === "true" ? process.env.VUE_APP_MOCK_URL : process.env.VUE_APP_CONSOLE_URL
console.log(target)
const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch")
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
  },
  productionSourceMap: false, // 生产环境的构造
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
  lintOnSave: false,
  publicPath: "./", // 根目录
  outputDir: "dist", // 打包输出文件地址
  assetsDir: "assets", // 放置生成的静态资源(js、css、img、fonts)的(相当于outputDir 的),目录。
  devServer: {
    // dev环境下，webpack-dev-server 相关配置
    // 端口号
    // 为什么不使用8080端口呢，因为后端的主服务和一些服务固定只能使用8080端口，为了防止端口冲突，一般会进行修改端口号
    port: 3020, // 开发运行时的端口
    host: "0.0.0.0", // 开发运行时域名,设置成'0.0.0.0'，在同一个局域网下，如果你的项目在运行，同时可以通过你的http://ip:port/...访问你的项目
    https: false, // 是否启用 https
    open: false, // npm run serve 时是否直接打开浏览器
    // // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    // // 配置代理
    // // 默认值是一个字符串或对象string|object
    // // 设置eslint校验错误信息，显示，warning信息不显示
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: {
      // 代理标识
      [process.env.VUE_APP_BASE_API]: {
        changeOrigin: true, // 配置代理默认开启target方式
        secure: false, // 如果是http接口，需要配置该参数
        target,
        // 路径重写
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  }
})

// let port = 8888
// module.exports = defineConfig({
//   // 第三方依赖是否需要转移，避免出现第三方的转移
//   transpileDependencies: true,
//   // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
//   lintOnSave: false,
//   // 代理端口配置
//   devServer: {
//     // 代理的地址
//     port,
//     // 配置代理
//     proxy: {
//       // change xxx-api/login => mock/login
//       // detail: https://cli.vuejs.org/config/#devserver-proxy
//       [process.env.VUE_APP_BASE_API]: {
//         target:
//           process.env.VUE_APP_MOCK_ENABLE === true
//             ? `http://localhost:${port}/mock`
//             : "process.env.VUE_APP_CONSOLE_URL",
//         changeOrigin: true,
//         pathRewrite: {
//           ["^" + process.env.VUE_APP_BASE_API]: ""
//         }
//       }
//     }
//   }
// })
