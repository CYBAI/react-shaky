'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  cache: true,
  debug: true,
  devtool: '#eval-cheap-module-source-map',
  entry: [
    path.resolve(__dirname, 'src', 'index.js')
  ],
  externals: {
    'react': {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    },
    'react-dom': {
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM'
    }
  },
  module: {
    preLoaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'eslint-loader',
        test: /\.js$/
      }
    ],
    loaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel',
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: 'react-shaky.js',
    library: 'ReactShaky',
    path: path.resolve(__dirname, 'dist'),
    umdNamedDefine: true
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ],
  resolve: {
    extensions: [ '', '.js' ],
  }
};
