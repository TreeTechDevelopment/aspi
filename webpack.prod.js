const common = require('./webpack.common')
const { merge } = require('webpack-merge');

module.exports  = merge(common, {
  mode: 'production',
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})

