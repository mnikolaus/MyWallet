const path = require('path');
const webpack = require('webpack');
const babelPolyfill = require('babel-polyfill');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  watch: !isProduction,
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: ['/node_modules/'],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
         'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin('./main.css')
  ],
  devtool: (isProduction) ? 'source-map' : 'eval',
}