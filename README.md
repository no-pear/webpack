## 2-2.模块化开发与规范化标准

### 2-2-1 模块化开发

#### 1) 模块化演变过程

+ 基于文件的划分模块的方式
  + 污染全局作用域
  + 命名冲突问题
  + 无法管理模块依赖关系

![image-20200929174136215](D:\lagou\lg_phase_one\partTwo_gch\moduleTwo_模块化开发与规范化标准\materials\image-20200929174136215.png)

+ 命名空间方式

`每个模块只暴露一个全局对象，所有模块成员都挂载到这个对象上` 

​	![image-20200929174240905](D:\lagou\lg_phase_one\partTwo_gch\moduleTwo_模块化开发与规范化标准\materials\image-20200929174240905.png)

+ IIFE 立即执行函数

![image-20200929174548166](D:\lagou\lg_phase_one\partTwo_gch\moduleTwo_模块化开发与规范化标准\materials\image-20200929174548166.png)

+ 利用 IIFE 参数作为依赖声明使用

![image-20200929174727636](D:\lagou\lg_phase_one\partTwo_gch\moduleTwo_模块化开发与规范化标准\materials\image-20200929174727636.png)

+ AMD 规范 （require.js)
  + AMD 使用起来相对复杂
  + 模块JS文件请求频繁
+ Sea.js+CMD（淘宝推出）

#### 2) 模块化标准规范

+ CommonJs in Node.js
+ ES Module in browser

#### 3) ES Moudle 基本特性

+ 自动采用严格模式，忽略‘use strict’
+ 每个ESM模块都是单独的私有作用域
+ ESM是通过CORS去请求外部JS模块的
+ ESM的script标签会延迟执行脚本

```js
<!-- 通过给 script 添加 type = module 的属性，就可以以 ES Module 的标准执行其中的 JS 代码了 -->
  <script type="module">
    console.log('this is es module')
  </script>

  <!-- 1. ESM 自动采用严格模式，忽略 'use strict' -->
  <script type="module">
    console.log(this)
  </script>

  <!-- 2. 每个 ES Module 都是运行在单独的私有作用域中 -->
  <script type="module">
    var foo = 100
    console.log(foo)
  </script>
  <script type="module">
    console.log(foo)
  </script>

  <!-- 3. ESM 是通过 CORS 的方式请求外部 JS 模块的 -->
  <!-- <script type="module" src="https://unpkg.com/jquery@3.4.1/dist/jquery.min.js"></script> -->

  <!-- 4. ESM 的 script 标签会延迟执行脚本 -->
  <script defer src="demo.js"></script>
  <p>需要显示的内容</p>
```

#### 4) ES Module 导出导入

```js
// 导出
// export var name = 'foo module'

// export function hello () {
//   console.log('hello')
// }

// export class Person {}

var name = 'foo module'

function hello () {
  console.log('hello')
}

class Person {}

// export { name, hello, Person }

// export {
//   // name as default,
//   hello as fooHello
// }

// export default name

// var obj = { name, hello, Person }

export { name, hello, Person }


// 导入
// import { default as fooName } from './module.js'
// console.log(fooName)

import { name, hello, Person } from './module.js'
console.log(name, hello, Person)

```



#### 5) ES Module 浏览器环境 Polyfill（兼容）

#### 6）ES Module  in Node.js 

+ 使用要求node版本8以上
+ 文件改为 .mjs 后缀

```js
// 第一，将文件的扩展名由 .js 改为 .mjs；
// 第二，启动时需要额外添加 `--experimental-modules` 参数；

import { foo, bar } from './module.mjs'

console.log(foo, bar)

// 此时我们也可以通过 esm 加载内置模块了
import fs from 'fs'
fs.writeFileSync('./foo.txt', 'es module working')

// 也可以直接提取模块内的成员，内置模块兼容了 ESM 的提取成员方式
import { writeFileSync } from 'fs'
writeFileSync('./bar.txt', 'es module working')

// 对于第三方的 NPM 模块也可以通过 esm 加载
import _ from 'lodash'
_.camelCase('ES Module')

// 不支持，因为第三方模块都是导出默认成员
// import { camelCase } from 'lodash'
// console.log(camelCase('ES Module'))

```

+ 与 CommonJs 交互
  + CommonJs 模块始终只会导出一个默认成员（相当于ES Module 中的export default）
  + import 不是解构导出对象
  + ES Module 中可以导入 CommonJs  模块
  + CommonJs 中不能导入 ES Module 模块
+ 与 CommonJs 差异

```js
// esm.mjs
// ESM 中没有模块全局成员了

// // 加载模块函数
// console.log(require)

// // 模块对象
// console.log(module)

// // 导出对象别名
// console.log(exports)

// // 当前文件的绝对路径
// console.log(__filename)

// // 当前文件所在目录
// console.log(__dirname)

// -------------

// require, module, exports 自然是通过 import 和 export 代替

// __filename 和 __dirname 通过 import 对象的 meta 属性获取
// const currentUrl = import.meta.url
// console.log(currentUrl)

// 通过 url 模块的 fileURLToPath 方法转换为路径
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log(__dirname)

```

```js
// cjs. js
// 加载模块函数
console.log(require)

// 模块对象
console.log(module)

// 导出对象别名
console.log(exports)

// 当前文件的绝对路径
console.log(__filename)

// 当前文件所在目录
console.log(__dirname)

```



### 2-2-2-1 webpack打包

#### 1) 快速上手

+ npm i webpack -D  项目安装
+ npx webpack 默认执行打包（src ---> dist)

```js
const path = require('path');

module.exports = {
    entry: './src/main.js', // 入口文件
    output: {
        filename: 'bundle.js',  // 打包输出文件
        path: path.join(__dirname, 'output') // 输出文件目录
    }
}
```

#### 2) 工作模式（mode）

+ production 生产
+ development 开发
+ none

#### 3) 资源模块加载

`**loader** 是webpack的核心特性，借助于loader就可以加载任何类型的资源`

```js
{
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
```



#### 4) 文件资源加载器

**file-loader**

```js
{
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 10 * 1024 // 10 KB
                    }

                }
            },
```



#### 5) URL 加载器

+ 小文件使用 Data URLs, 减少请求次数(url-loader)
+ 大文件单独提前存放，提高加载速度

#### 6) 常用加载器分类

+ 编译转换类
+ 文件操作类
+ 代码检查类(eslint-loader)

#### 7) webpack 与 ES2015

+ webpack只是打包工具
+ 加载器可以用来编译转换代码

#### 8) webpack 模块加载方式

+ 遵循ES Module 标准的 import 声明
+ 遵循 Common JS 标准的 require 函数
+ 遵循 AMD 标准的 define 函数 和 require 函数
+ 样式代码猴子那个 @import 指令 和 url 函数
+ HTML 代码中图片标签的 src 属性

#### 9) webpack 核心工作原理

#### 10) webpack 插件机制

` **loader** 专注实现资源模块加载，**Plugin** 解决其他自动化工作`

+ 自动清除输出目录插件 clean-webpack-plugin
+ 自动生成使用 bundle.js 的 HTML    html-webpack-plugin

```js
// 用于生成 index.html
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
                viewport: 'width=device-width'
            },
            template: './src/index.ejs'
        }),
        // 用于生成 about.html
        new HtmlWebpackPlugin({
            filename: 'about.html'
        }),
```



+ copy-html-plugin

```js
new CopyWebpackPlugin({
            patterns:[
                { from: 'public'},
              ],
            })
```

#### 11) webpack 插件

`一个函数或者是一个包含apply方法的对象,通过在生命周期的钩子中挂载函数实现扩展`

```js
// 自定义插件，去除输出js文件的注释
class MyPlugin {
    apply(compiler){
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
```



### 2-2-2-2 webpack增强开发体验

#### 1) 自动编译

watch工作模式 ---> 监听文件变化，自动重新打包

```js
npx webpack --watch
或者 把watch属性设置为true
```

#### 2) 自动刷新浏览器

```js
1. npm i browser-sync -g
2. browser-sync dist --files '**/*'
```

#### 3) Webpack Dev Server

`集成自动编译和自动刷新浏览器，打包结果暂时保存在内存中未输出到dist`

```js
1. npm i webpack-dev-server
2. npx webpack-dev-server --open
```

+ contentBase  额外为开发服务器指定查找资源目录
+ 代理API

```js
devServer: {
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
```

#### 4) Source Map

`解决了源代码与运行代码不一致所产生 的（调试）问题`

#### 5) webpack 配置 Source Map（共12种方式）

[devtool 注解](https://www.webpackjs.com/configuration/devtool/)

+ source-map 原始源代码

```js
devtool: 'source-map',
```

![image-20201013154501010](D:\lagou\lg_phase_one\partTwo_gch\moduleTwo_模块化开发与规范化标准\materials\image-20201013154501010.png)

+ eval 模式(速度最快，只能定位文件名称，不能定位到具体错误行数信息)   生成后的代码 	

```js
devtool: 'eval',
```

![image-20201013154704009](D:\lagou\lg_phase_one\partTwo_gch\moduleTwo_模块化开发与规范化标准\materials\image-20201013154704009.png)

+ eval-source-map 原始源代码
+ cheap-eval-source-map 转换过的代码（仅限行）
+ cheap-module-eval-source-map 原始源代码（仅限行）

**注**：

+ eval - 是否使用eval 执行模块代码
+ cheap - Source Map 是否包含行信息
+ module - 是否能够得到Loader处理之前的源代码

#### 6）webpack 选择 Source Map 模式

+ 开发模式 cheap-module-eval-source-map
  + 代码每行基本不会超过80个字符，定位到行已足够
  + 代码经过Loader转换过后的差异较大(调试转换前的源代码更优)
  + 首次打包速度慢无所谓，重写打包相对较快
+ 生产模式 none/nosources-source-map
  + Source Map 会暴露源代码

#### 7) HMR 热更新、热替换

集成在`webpack-dev-server`中，使用通过`webpack-dev-server --hot`启用，或者通过配置文件开启

```js
// 1. devServer 里设置 hot 为 true
hot: true,

// 2. 使用webpack内置插件HotModuleReplacementPlugin
    const { HotModuleReplacementPlugin } = require('webpack');
// HMR
        new HotModuleReplacementPlugin()
```

#### 8）webpack 使用 HMR API

+ 注意事项
  + hotOnly
  + 未开启HMR
  + 代码中多了很多与业务无关的代码（无影响）

#### 9）生成环境优化

**生成环境**注重**运行**效率，**开发环境**注重**开发**效率

+ 不同环境下的配置（两种方式）

  + 配置文件根据环境不同导出不同配置

  + 一个环境对应一个配置文件（多配置文件）

    + webpack.dev.js 开发环境
    + webpack.prod.js 生产环境
    + webpack.common.js 公共配置

    ```js
    webpack --config webpack.dev.js  指定打包时的配置文件
    ```

+ DefinePlugin

  + process.end.NODE_ENV
  +  允许创建一个在**编译**时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
  + 每个传进 `DefinePlugin` 的键值都是一个标志符或者多个用 `.` 连接起来的标志符。
    - 如果这个值是一个字符串，它会被当作一个代码片段来使用。
    - 如果这个值不是字符串，它会被转化为字符串(包括函数)。
    - 如果这个值是一个对象，它所有的 key 会被同样的方式定义。
    - 如果在一个 key 前面加了 `typeof`,它会被定义为 typeof 调用。

+ Tree Shaking 摇掉未引用代码

  + 生产环境默认开启
  + 其他环境手动配置

  ```js
  optimization: {
      // 模块只导出被使用的成员
      usedExports: true,
      // 尽可能合并每一个模块到一个函数中
      concatenateModules: true,
      // 压缩输出结果
      minimize: true
    }
  ```

+ sideEffects 副作用 （生产环境默认开启）

```js
optimization: {
    sideEffects: true,
  }
```

#### 10) 代码分割

+ 多入口打包
  + 适用于多页面应用 
+ 动态导入

#### 11）MiniCssExtractPlugin

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(), // js压缩插件
      new OptimizeCssAssetsWebpackPlugin() // css压缩插件
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dynamic import',
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}

```

#### 12）输出文件名Hash

+ hash 项目层面
+ chunkhash  同一路（比如多入口文件时某一入口所影响的）
+ contenthash 文件层面 控制缓存的最优选择（8位）

### 2-2-3 Rollup

#### 1）快速上手

```js
npm i rollup -D  安装

npx rollup .\src\index.js --file ./dist/bundle.js 打包
npx rollup .\src\index.js --format iife --file ./dist/bundle.js 打包（立即执行函数）
```

#### 2）使用插件

+ rollup-plugin-json

```js
import json from 'rollup-plugin-json'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife', // 输出格式
    },
    plugins: [
        json()
    ]
}
```

+ rollup-plugin-node-resolve  加载npm模块 

rollup 默认只能按路径查找模块，rollup-plugin-node-resolve用来告诉rollup查找外部模块(node_modules)

+ rollup-plugin-commonjs 加载CommonJS模块

由于rollup 默认只处理 **ES Module** 模块打包

#### 3) 代码拆分、动态导入

```js
output: {
        // file: 'dist/bundle.js',
        // format: 'iife', // 输出格式

        //代码拆分、动态导入
        dir: 'output',
        // format: 'amd'
    },
```

#### 4) 多入口打包

```js
// 多入口打包
export default {
    // input: ['src/index.js', 'src/album.js'],
    input: {
      foo: 'src/index.js',
      bar: 'src/album.js'
    },
    output: {
      dir: 'dist',
    //   format: 'amd'
    }
  }
```

#### 5) roullp / webpack 选用原则

+ rollup 优点
  + 输出结果更加扁平
  + 自动移除未引用代码
  + 打包结果既然完全可读
+ rollup 缺点
  + 加载非 ESM 的第三方模块比较复杂
  + 无法实现HMR

开发应用程序 ------- webpack ------大而全

开发一个框架或者类库(如vue, react) ------ rollup ------小而美

### parcel 零配置的前端应用打包器（2017）

+ 背景

当时的 Webpack 使用上过于繁琐

+ 核心特点
  + 完全零配置
  + 自动安装依赖
  + 构建速度更快（内部多进程同时工作）
+ vs  webpack
  + webpack 有更好的生态
  + webpack 越来越好用

### 2-2-4 规范化标准

#### 1）为什么要有规范化标准

+ 软件开发需要多人协同
+ 不同开发者具有不同的编码习惯和喜好
+ 不同的喜好增加项目维护成本
+ 每个项目或者团队需要明确统一的标准

#### 2）哪里需要规范化标准

+ 代码、文档、甚至是提交日志
+ 开发过程中人为编写的成果物
+ 代码标准化规范最为重要

#### 3）实施规范化的方法

+ 编码前人为的标准约定
+ 通过工具实现 **Lint**

#### 4）ESLint 介绍

+ 最为主流的 JavaScript Lint 工具，监测代码质量
+ ESLint 很容易统一开发者的编码风格
+ ESLint 可以帮助开发者提升编码能力

#### 5）ESLint 安装

+ 初始化项目

```js
npm init -y
```



+ 安装 ESLint 模块为开发依赖

```js
npm i eslint -D
```



+ 通过 CLI 命令验证安装结果

```js
npx eslint --version
```



#### 6) ESLint 快速上手

+ 编写 “问题” 代码
+ 使用 eslint 执行检测

```js
npx eslint --init  生成配置文件.eslintrc.js

npx eslint '文件' 检测
npx eslint '文件' --fix 检测并尝试修复一些错误
```



+ 完成 eslint 使用配置

```js
// .eslintrc.js
module.exports = {
  env: { // 标记当前代码最终的运行环境, 不互斥，可以开启多个环境
    browser: true, // 浏览器环境（成员可用，如document，window）
    es2021: true
  },
  extends: [ // 继承共享配置，可以同时继承多个共享配置
    'standard'
  ],
  parserOptions: { // 设置语法解析器的相关配置
    ecmaVersion: 12
  },
  rules: { // 配置 ESLint 每一个校验规则的开启和关闭
    'no-alert': 'warn' // 值可设置 off or 0(关闭), warn or 1(警告), error or 2(报错)
  },
  globals: { //额外声明可以使用的全局成员
    'jQuery': 'readonly'
  }
}

```

+ ESLint 配置注释

[官网链接](http://eslint.cn/docs/user-guide/configuring#configuring-rules)

```js
const str = '${name} is a coder' // eslint-disable-line no-template-curly-in-string

console.log(str)

```

+ ESLint 结合自动化工具

  + 集成之后，ESLint 一定会工作
  + 与项目统一，管理更加方便
  + ESLint 结合 gulp

  ```js
  // gulpfile.js
  const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError())
      .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
  }
  ```

  

  + ESLint 结合 webpack
  + 现代化项目集成ESLint（如vue-cli)

#### 7) ESLint 检查 TypeScript

```js
// eslintrc.js
"parser": "@typescript-eslint/parser",
 "plugins": [
        "@typescript-eslint",

    ],
```

#### 8）stylelint 

#### 9）Prettier 的使用

```js
1. npm i prettier -D
2. npx prettier '文件路径' 格式化
3. npx prettier '文件路径' --write 格式化并覆盖源文件
4. npx prettier . --write 格式化所有文件
```

#### 10）Git Hooks 介绍

+ 背景：
  + 代码提交至仓库之前未执行 lint 工作
  + 通过 Git Hooks 在代码提交前强制 lint
+ Git Hooks 也称之为 Git 钩子， 每个钩子都对应一个任务
+ 通过 shell 脚本 可以编写钩子任务 触发时要具体执行的操作

#### 11）ESLint 结合 Git Hooks  ------ Husky

```js
1. npm install husky --save-dev
2. 设置 scripts 标签 test 指令为具体操作
// package.json
{
  "scripts": {
      "test": "eslint ./index.js",
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run test", // git commit 时触发
    }
  }
}

3. npm install lint-staged -D
4. 
    // package.json
{
  "scripts": {
      "test": "eslint ./index.js",
      "precommit": "lint-staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit", // git commit 时触发
    }
  },
  "lint-staged": {
      "*.js": [
          "eslint",
          "git add"
      ]
  }
}
```

