const betterProgress = require('better-webpack-progress');
module.exports = {
    
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
