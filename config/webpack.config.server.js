const ServerPlugin = require('vue-server-renderer/server-plugin'),//生成服务端清单
  nodeExternals = require('webpack-node-externals');//忽略node_modules文件夹中的所有模块
const ExtractPlugin = require('extract-text-webpack-plugin')
const utils = require('util')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base');
const createVueLoaderOptions = require('./vue-loader.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  target: 'node',
  entry: `./src/entry/server`,
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../distDev')
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new ServerPlugin(),
    new VueLoaderPlugin(),
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
      },
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  }
}
