const { resolve } = require("path")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: [resolve("src/preserved.js"), resolve("src/concatenated.js")],
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: "static" })
  ]
}