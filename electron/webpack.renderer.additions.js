/**
 * This file is used to customize webpack default config from electron-webpack
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: function() {
    return {
      mainWindow: path.resolve(__dirname, 'src/renderer/mainWindow.ts'),
    }
  },
  module: {
    rules: [
      {
        test: /\.mscss$/,
        loaders: [
          'style-loader?sourceMap',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: true,
              localIdentName: '[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../app/src'), 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      "template": path.resolve(__dirname, 'src/renderer/mainWindow.html'),
      "filename": 'mainWindow.html',
    })
  ]
}
