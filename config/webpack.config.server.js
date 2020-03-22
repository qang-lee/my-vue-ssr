const ServerPlugin = require('vue-server-renderer/server-plugin'),//生成服务端清单
  nodeExternals = require('webpack-node-externals');//忽略node_modules文件夹中的所有模块
// const ExtractPlugin = require('extract-text-webpack-plugin')
const utils = require('util')
const path = require('path')
// const merge = require('webpack-merge')
// const baseConfig = require('./webpack.config.base');
const createVueLoaderOptions = require('./vue-loader.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  target: 'node',//1，首先指定node平台，这个是要在服务器端进行配置的
  entry: `./src/entry/server`,//2. 指定入口文件
  devtool: 'source-map',//3. 开启sourcemap
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../distDev')
  },
  externals: Object.keys(require('../package.json').dependencies),//一些库在前端都已经打包好了，服务端做下排除
  plugins: [
    new ServerPlugin(),//真多服务器端点用服务器端插件
    new VueLoaderPlugin(),//不加不行。。
  ],
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}
