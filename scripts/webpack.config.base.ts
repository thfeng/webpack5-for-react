import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackBar from 'webpackbar';

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[hash:6][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|woff|woff2|otf|tff|svg)/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?|$)/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
        generator: {
          filename: 'img/[name].[hash:6][ext]',
          publicPath: './',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new WebpackBar(),
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
