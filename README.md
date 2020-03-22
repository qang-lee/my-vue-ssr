[过程文章](https://wozhaodiaodiao.github.io/2020/03/18/js%E6%98%AF%E5%90%A6%E6%98%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E8%AF%AD%E8%A8%80/)

# vuessr

#### 本地运行
    npm run dev


注意事项，如果单独执行命令请先执行`dev:client`后执行`dev-server`


目录结构
```
|-- vuessr
    |-- .gitignore
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- vue.config.js
    |-- dist //生产环境的打包目录
    |-- distDev //开发环境的打包目录
    |-- nodeScript //node 渲染配置
    |   |-- index.js
    |   |-- proxy.js
    |   |-- server.js
    |-- public//模板文件
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- index.nodeTempalte.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- router.config.js //路由集合
        |-- store.config.js //vuex 集合
        |-- assets//全局静态资源源码
        |   |-- 备注.txt
        |   |-- img
        |       |-- logo.png
        |-- components//全局组件
        |   |-- Head
        |       |-- index.js
        |       |-- index.scss
        |       |-- index.vue
        |       |-- img
        |           |-- logo.png
        |-- entry//cli3入口
        |   |-- client.js
        |   |-- server.js
        |   |-- 备注.txt
        |-- methods//公共方法
        |   |-- 备注.txt
        |   |-- mixin
        |       |-- index.js
        |-- pages//源码目录
        |   |-- home
        |   |   |-- index.js
        |   |   |-- index.scss
        |   |   |-- index.vue
        |   |   |-- img
        |   |   |   |-- flow.png
        |   |   |   |-- head_portrait.jpg
        |   |   |   |-- logo.png
        |   |   |   |-- vuessr.png
        |   |   |-- vue
        |   |   |   |-- index.js
        |   |   |   |-- index.scss
        |   |   |   |-- index.vue
        |   |   |-- vueCli3
        |   |   |   |-- index.js
        |   |   |   |-- index.scss
        |   |   |   |-- index.vue
        |   |   |-- vueSSR
        |   |   |   |-- index.js
        |   |   |   |-- index.scss
        |   |   |   |-- index.vue
        |   |   |-- vuex
        |   |       |-- index.js
        |   |       |-- index.scss
        |   |       |-- index.vue
        |   |-- router//路由配置
        |   |   |-- index.js
        |   |-- store//vuex配置
        |       |-- all.js
        |-- static//cdn资源
            |-- 备注.txt

```


### 结语
   目前基本跑通了服务端渲染的流程，(虽然只完成了html的渲染。。。)，但总体还算可以帮助理解整个ssr渲染的流程和大体原理，待我对vue.config.js配置系统学习后继续完成
