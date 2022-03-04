import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
};

export default config;
