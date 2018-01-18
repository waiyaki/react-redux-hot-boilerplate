const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'client/src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const { NODE_ENV } = process.env;

const config = {
  devtool: 'inline-source-map',
  entry: ['./client/src/index.js'],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [/src/],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin('styles.css')],
  devServer: {
    overlay: true,
    stats: {
      colors: true,
      modules: false,
    },
  },
};

if (NODE_ENV === 'production') {
  config.devtool = false;
  config.module.rules = [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
    ...config.module.rules,
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ];
} else {
  config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    ...config.entry,
  ];
  config.devServer = {
    contentBase: './client/dist',
    hot: true
  };
  config.module.rules = [
    {
      test: /\.css/,
      use: ['style-loader', 'css-loader'],
    },
    ...config.module.rules,
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
}

module.exports = config;
