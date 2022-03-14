import { Configuration, RuleSetUseItem } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'webpack-merge';
import BaseConfig, {
  cssModule,
  lessModule,
  sassModule,
} from './webpack.config.base';

(cssModule.use as RuleSetUseItem[]).splice(0, 1, {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: './',
  },
});

(lessModule as RuleSetUseItem[]).splice(0, 1, {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: './',
  },
});

(sassModule as RuleSetUseItem[]).splice(0, 1, {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: './',
  },
});

const config: Configuration = {
  mode: 'production',
  module: {
    rules: BaseConfig.module.rules.concat([cssModule, lessModule, sassModule]),
  },
  plugins: BaseConfig.plugins?.concat([
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
  ]),
};

export default merge(BaseConfig, config);
