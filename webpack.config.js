const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './public/build'),
    publicPath: '/',
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  entry: {
    site: [
      './client/index.js',
      './client/index.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Personal Library',
      template: path.resolve(__dirname, './client/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // SASS
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,
        type: 'asset/resource'
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ]
  }
}
