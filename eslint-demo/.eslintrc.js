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
