const ClientPlugin = require('vue-server-renderer/client-plugin');//生成客户端清单
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base');
module.exports = merge(baseConfig, {
    devServer: {
        proxy: 'http://localhost:8080'
    },
    outputDir: 'dist/',
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

    },
    configureWebpack: () => ({
        entry: `./src/entry/client`,
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
        },
        target: 'web',
        externals: undefined,
        plugins: [//根据环境来生成不同的清单。
            new ClientPlugin()
        ]
    })
});

