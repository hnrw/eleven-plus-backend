module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "jsx-a11y/label-has-associated-control": 0,
    "no-underscore-dangle": 0,
    radix: 0,
  },
}
