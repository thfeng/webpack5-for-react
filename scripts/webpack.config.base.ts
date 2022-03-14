import path from 'path';
import { Configuration, RuleSetRule } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackBar from 'webpackbar';

export const cssModule: RuleSetRule = {
  test: /\.css$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
    'postcss-loader',
  ],
};

export const sassModule: RuleSetRule = {
  test: /\.s(a|c)ss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
    'postcss-loader',
    'sass-loader',
  ],
};

export const lessModule: RuleSetRule = {
  test: /\.less$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
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
};

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
      cssModule,
      lessModule,
      sassModule,
      {
        test: /\.(t|j)sx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
      {
        test: /\.json/i,
        include: path.resolve('../', 'locales'),
        type: 'javascript/auto',
        generator: {
          filename: 'locales/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@@': path.resolve(__dirname, '../'),
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
