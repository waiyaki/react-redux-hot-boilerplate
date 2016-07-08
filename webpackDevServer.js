const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(8080, 'localhost', (err) => {
  /* eslint-disable no-console */
  if (err) {
    console.log(err);
  }
  console.log('Listening on localhost:8080');
  /* eslint-enable no-console */
});
