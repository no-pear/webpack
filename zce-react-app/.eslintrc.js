module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard",
        "plugin: react/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "@typescript-eslint",
        // 'react'

    ],
    "rules": {
        // 'react/jsx-uses-react': 2,
        // 'react/jsx-uses-vars': 2
    }
}