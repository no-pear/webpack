const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    compilation,
    HotModuleReplacementPlugin
} = require('webpack');

// 自定义插件，去除输出js文件的注释
class MyPlugin {
    apply(compiler) {
        console.log('MyPlugin start!!!')

        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文
            for (const name in compilation.assets) {
                // console.log(name) // 文件名
                // compilation.assets[name].source() 文件内容
                if (name.endsWith('.js')) {
                    const contents = compilation.assets[name].source(); // 获取文件内容
                    // 替换所有 /** */ 类型(/** */, /*** */, /**** */ 等)
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, '');

                    // 替换输出内容
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}

module.exports = (env, argv) => {
    // 开发环境
    const config = {
        mode: 'none',
        // entry: './src/main.js',
        entry:{
            //多入口配置
            index: './src/index.js',
            about: './src/about.js'
        },
        output: {
            filename: '[name]-[contenthash:8].bundle.js',
            path: path.join(__dirname, 'dist'),
            // publicPath: 'dist/'
        },
        optimization: {
            splitChunks: {
                chunks: 'all' // 所有的公共模块提前到bundle当中
            }
        },
        // watch: true,
        devServer: {
            hot: true,
            // hotOnly: true, // 无论代码是否处理了热替换，都不会自动刷新
            // 额外为开发服务器指定查找资源目录
            contentBase: './public',
            proxy: {
                '/api': {
                    // http://localhost:8080/api/users -> https://api.github.com/api/users
                    target: 'https://api.github.com',

                    // http://localhost:8080/api/users -> https://api.github.com/users
                    pathRewrite: {
                        '^/api': '',
                    },
                    // 不能使用 localhost:8080 作为请求 GitHub 的主机名
                    changeOrigin: true,
                }
            }
        },
        devtool: 'cheap-module-eval-source-map',
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(jpg|png)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            limit: 10 * 1024 // 10 KB
                        }

                    }
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            // attrs: ['img:src', 'a:href']
                            // attrs: [':data-src']
                            attributes: {
                                list: [{
                                        tag: 'a',
                                        attribute: 'href',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        plugins: [
            // 清除上一次打包生产的文件
            // new CleanWebpackPlugin(),

            // 用于生成 index.html
            new HtmlWebpackPlugin({
                cache: false,
                title: 'Webpack Plugin Sample',
                meta: {
                    viewport: 'width=device-width'
                },
                template: './src/index.ejs',
                chunks: ['index'], // 指定注入打包的bundle.js
            }),

            // 用于生成 about.html
            new HtmlWebpackPlugin({
                filename: 'about.html',
                chunks: ['about'],
            }),

            // 开发阶段尽量不使用这个插件，用来打包静态资源
            // new CopyWebpackPlugin({
            //     patterns: [{
            //         from: 'public'
            //     }, ],
            // }),

            new MyPlugin(),

            // HMR
            // new HotModuleReplacementPlugin()
        ]
    }

    // 生产环境
    if(env === 'production'){
        config.mode = 'production';
        config.devtool = false;
        config.plugins = [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [{
                    from: 'public'
                }, ],
            })
        ]
    }

    return config
}