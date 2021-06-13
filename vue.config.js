module.exports = {
    // baseUrl从 Vue CLI 3.3 起已弃用，请使用publicPath
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
    // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    publicPath:
        process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
    // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
    // 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
    // 默认值'dist'
    outputDir: "my-app",
    // 放置生成的静态资源 (js、css、img、fonts) 的目录(相对于outputDir目录)。
    // 默认值''
    assetsDir: "assets",
    //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    // 默认值'index.html'
    indexPath: "myIndex.html",
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
    filenameHashing: false,
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    lintOnSave: false,

    //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: true,
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    chainWebpack: config => {
        // config.resolve.alias
        //     .set('@', resolve('src')) //3.0的写法 映射路径 @代表src 比如要写一个图片 <img src='@/assets/img/1.jpg'/>就会读取src下assets下img下的图片
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    },
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             assets: '@/assets',
    //             components: '@/components',
    //             views: '@/views'
    //         }
    //     }
    // },
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/main.scss";`
            }
        }
    },
    // 所有 webpack-dev-server 的选项都支持。
    devServer: {
        host: "localhost",
        port: 8080, // 端口号
        https: false,
        open: false, //配置自动启动浏览器
        hotOnly: false,
        proxy: null,  //设置代理
        // 配置多个代理
        proxy: {
            "/api": {
                // target: "https://reactrouter.com/web/guides/quick-start", //配置跨域服务器地址
                // target: "http://www.web-jshtml.cn/api/",
                // target: " http://192.168.1.103:8082",
                target: " http://localhost:8082",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "" // 去掉接口地址中的api字符串
                }
            },
            "/foo": {
                target: "http://localhost:8080", // 本地模拟数据服务器
                changeOrigin: true,
                pathRewrite: {
                    "^/foo": "" // 去掉接口地址中的foo字符串
                }
            }
        }
    },
};
