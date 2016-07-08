const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'public/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const config = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      exclude: /node_modules/
    }, {
      test: /\.css?$/,
      loaders: ['style', 'css'],
      exclude: /node_modules/
    }]
  },
  resolve: ['', '.js', '.jsx'],
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    ...config.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  ];
} else {
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}
module.exports = config;