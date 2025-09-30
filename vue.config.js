const path = require('path')
const fs = require('fs')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 指定主机
    port: 8080,       // 指定端口
    client: {
      webSocketURL: 'wss://0.0.0.0/ws', // 手动指定 WebSocket 地址
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    allowedHosts: "all",
    // server: {
    //   type: 'https',
    //   options: {
    //     key: fs.readFileSync(path.join(__dirname, 'certs', 'lilinghao.site.key')),
    //     cert: fs.readFileSync(path.join(__dirname, 'certs', 'lilinghao.site_bundle.crt'))
    //   },
    // }
  },
})