const path = require('path');
//const merge = require('webpack-merge');
const {merge}  = require('webpack-merge');
const common = require("./webpack.common.js");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "9000";
const KYC_DMN_PROXY = process.env.KYC_DMN_PROXY || "http://127.0.0.1:8080";

module.exports = merge(common('development'), {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    host: HOST,
    port: PORT,
    compress: false,
    historyApiFallback: true,
    hot: true,
    open: true,
    liveReload: true,
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
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/base.css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css')
        ],
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});
