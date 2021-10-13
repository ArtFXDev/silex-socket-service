module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "node/no-callback-literal": "off",
    "space-before-function-paren": "off"
  }
}
