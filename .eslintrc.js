module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        // "es2021": true
        "es6": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "8",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {

    }
}
