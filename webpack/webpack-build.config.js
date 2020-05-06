/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'production',
  context: path.resolve(__dirname, '../src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, `../dist/${process.env.PLATFORM}`),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          toplevel: true,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PLATFORM: JSON.stringify(process.env.PLATFORM),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      appMountId: 'app',
      filename: 'index.html',
      minify: false,
      hash: false,
      inject: 'body',
      inlineSource: '.js$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
};

module.exports = config;
