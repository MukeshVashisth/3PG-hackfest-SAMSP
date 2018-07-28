const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
})

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'), // single entry point
  
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
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'src/index.html'
    })
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
};
