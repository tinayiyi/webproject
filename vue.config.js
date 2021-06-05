module.exports = {
  devServer: {
    host: 'localhost',
    port: 8090,
    open: true, // 设置自动打开
    proxy: {
      '^/api': {
        target: 'https://beta-zb-api.cuomj.cn',
        // target: 'https://zb-api.cuomj.cn',
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          //路径重写
          '^/api': ''
        }
      },
      '^/vid': {
        target: 'http://rs.p5w.net',
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/vid': ''
        }
      }
    }
  },
  publicPath: './', // 部署应用包时的基本 URL
  outputDir: process.env.outputDir,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/_variable.scss";`
      }
    }
  }
}
