const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './example/js/app.js',
    vendors: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ]
  },
  debug: true,
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'example'),
    filename: '[name].bundle.js'
  },
  serverConfig: {
    port: '3000',
    publicPath: '/',
    contentBase: 'example/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-shaky': path.resolve(__dirname, './src')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/ ],
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.css$/, loader: 'style-loader!css-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
