const fs = require('fs');
const { resolve } = require('path');
const koa = require('koa');
const koaBody = require('koa-body')
const app = new koa();
//环境
const isDev = process.env.NODE_ENV === 'development';
const pathDir = isDev ? '../distDev' : '../dist';
//请求静态资源相关配置
function getStaticSrc(){
}
let pageRouter = isDev?require('./routers/dev-ssr'):require('./routers/ssr-no-bundle');
app.use(koaBody())//?
getStaticSrc();
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3332
app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
module.exports = app;
