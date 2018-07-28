const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    stats: 'errors-only',
    compress: true,
    port: 3000
  }
});