const ClientPlugin = require('vue-server-renderer/client-plugin'),//生成客户端清单
    nodeExternals = require('webpack-node-externals');//忽略node_modules文件夹中的所有模块
module.exports = {
    devServer: {
        proxy: 'http://localhost:8080'//通过这个服务地址进行前端打包文件的获取
    },
    outputDir: 'dist/',
    configureWebpack: (config) => {
        return ({
            entry: `./src/entry/client`,
            output: {
                filename: 'js/[name].js',
                chunkFilename: 'js/[name].js',
                libraryTarget:  undefined
            },
            target:  'web',
            externals:  undefined,
            plugins: [
               new ClientPlugin(),//根据环境调用不同的渲染插件。
            ]
        })
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                options.optimizeSSR = false;
                return options;
            });
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                options = {
                    limit: 1024,
                    fallback: 'file-loader?name=img/[path][name].[ext]'
                }
                return options;
            });
    }
}
