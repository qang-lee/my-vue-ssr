const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {

  ctx.headers['Content-Type'] = 'text/html'
  console.log("ctx.path"+ctx.path);
  const context = { url: ctx.path }

  try {
    const appString = await renderer.renderToString(context)
    // console.log(renderer);
    // if (context.router.currentRoute.fullPath !== ctx.path) {
    //   return ctx.redirect(context.router.currentRoute.fullPath)
    // }

    // const {
    //   title
    // } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      scripts: context.renderScripts(),
    })
    // ctx.body = {
    //   data:context.renderScripts()
    // }
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
