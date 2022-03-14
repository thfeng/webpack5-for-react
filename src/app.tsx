import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import { IntlProvider } from 'react-intl';
import Messages from '../locales/zh-CN.json';

import './app.less';

const App = () => {
  return (
    <IntlProvider messages={Messages} locale="zh-CN" defaultLocale="en-US">
      <h1>Webpack 5 with Typescript for React.js</h1>
      <Home></Home>
    </IntlProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app-root'));
