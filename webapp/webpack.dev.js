/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { stylePaths } = require('./stylePaths');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '9000';
const KYC_DMN_PROXY = process.env.KYC_DMN_PROXY || "http://127.0.0.1:8080";


module.exports = merge(common('development'), {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: HOST,
    port: PORT,
    compress: false,
    historyApiFallback: true,
    hot: true,
    open: true,
    liveReload: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    client: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: KYC_DMN_PROXY,
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [...stylePaths],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
