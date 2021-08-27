// config-overrides.js 用于修改默认webpack配置，package中需要修改"start": "react-app-rewired start"
// BundleAnalyzerPlugin
const { override, addWebpackAlias, overrideDevServer } = require('customize-cra')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// 关闭所有source-map
process.env.GENERATE_SOURCEMAP = 'false' // css和js的map都会关闭

// 移除manifest.json
const removeManifest = () => (config) => {
    config.plugins = config.plugins.filter((p) => p.constructor.name !== 'ManifestPlugin')
    return config
}

// 分离打包模块
const splitMokuai = () => (config) => {
    // 利用 splitChunks 打包模块
    // 开启分离所有模块js
    config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all', // 表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks
            maxInitialRequests: Infinity, // 最大的初始化加载并行请求数(即分离的js文件数量)，默认为 3，Int/Infinity
            minSize: 500000, // 表示抽取出来的文件在压缩前的最小大小，默认为 30000，设为了0，再小的模块也分离

            cacheGroups: {
                // --test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
                // --priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
                // --reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。

                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                        return `${packageName.replace('@', '')}`
                    },
                },
            },
        },
    }

    return config
}

// 设置代理
const addProxy = () => (config) => {
    config.proxy = {
        '/im/v1': {
            // 代理名称
            target: 'http://3.141.23.218:5000', // 代理目标地址
            ws: true, // 是否代理websockets
            changeOrigin: true, // 是否跨域
        },
    }
    return config
}

module.exports = {
    webpack: override(
        removeManifest(),
        splitMokuai(),

        // 添加@Alias路径
        addWebpackAlias({
            '@': resolve('src'),
        }),
    ),
    // 开发模式下
    devServer: overrideDevServer(addProxy()),
}
