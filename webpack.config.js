const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
})

const config = {
  entry: path.resolve(__dirname, 'src/index.js'), // single entry point

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.(js|jsx)$/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        exclude: /(node_modules)/,
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: ['css-hot-loader'].concat(extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        }))
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ],

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    stats: 'errors-only',
    compress: true,
    port: 3000
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}

module.exports = config
