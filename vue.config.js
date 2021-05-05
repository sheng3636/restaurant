'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '金融服务综合业务与数据分析平台' // 页面标题

// 如果你的端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac: sudo npm运行
// 您可以通过以下方法改变端口:
// 端口= 9528 npm运行dev或npm运行dev——端口= 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// 所有的配置项说明都可以在https://cli.vuejs.org/config/中找到
module.exports = {
  /**
   * 如果您计划在子路径下部署站点， 则需要设置publicPath，
   * 例如GitHub页面。 如果您计划将您的站点部署到https: //foo.github.io/bar/，
   * 然后将publicPath设置为“ / bar / ”。
   * 在大多数情况下， 请使用 '/'!!
   * 细节见: https: //cli.vuejs.org/config/ publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // process.env.NODE_ENV === 'development'
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {

      // change xxx-api/login => mock/login
      // 细节见: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://remote.natapp1.cc`,
        // target: `http://localhost:8085/`,
        target: `http://47.103.104.87:8090/`,
        
        changeOrigin: true,
        // logLevel:'debug',
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '/'
        }
      }
    },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题，以便
    // 可以在index.html中访问它以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // “运行时”必须与runtimeChunk名称相同。默认是“运行时”
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将elementUI拆分成一个包
                  priority: 20, // 重量需要大于libs和app，否则会被打包成libs或app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 以适应cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, //  最低常见的数量
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
