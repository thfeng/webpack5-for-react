import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import PokemonList from './pages/pokemon/PokemonList';
import Messages from '../locales/zh-CN.json';
import './app.less';

const App = () => {
  return (
    <IntlProvider messages={Messages} locale="zh-CN" defaultLocale="en-US">
      <h1>Webpack 5 with Typescript for React.js</h1>
      <BrowserRouter>
        <nav>
          <Link to="/pokemon">View Pokemon</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
        <Routes>
          <Route path="/pokemon" element={<PokemonList></PokemonList>}></Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app-root'));
