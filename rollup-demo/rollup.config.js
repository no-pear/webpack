import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

// export default {
//     input: 'src/index.js',
//     output: {
//         // file: 'dist/bundle.js',
//         // format: 'iife', // 输出格式

//         //代码拆分、动态导入
//         dir: 'output',
//         // format: 'amd'
//     },
//     plugins: [
//         json(),
//         resolve(),
//         commonjs()
//     ]
// }

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