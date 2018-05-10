import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import fetch from 'node-fetch';
import { ApolloProvider, getDataFromTree, renderToStringWithData  } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import routes from './react/routes';
import AppRouter from './react/serverRouter';
import createStore from './redux/store';
import stats from '../dist/stats.generated';

function assets(name) {
  const prefix = '/static/';
  if (name instanceof Array) {
    return prefix + name[0];
  }
  return prefix + name;
}

module.exports = async (req, res, next) => {
  try{
  const client = new ApolloClient({
   ssrMode: true,
   // Remember that this is the interface the SSR server will use to connect to the
   // API server, so we need to ensure it isn't firewalled, etc
   link: createHttpLink({
     uri: 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex',
     // credentials: 'same-origin',
     headers: {
       cookie: req.header('Cookie'),
     },
     fetch,
   }),
   cache: new InMemoryCache(),
 });

    const context = {};
console.log(req.url);
    const App = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <AppRouter />
        </StaticRouter>
        </ApolloProvider>
      );

    getDataFromTree(App).then((test) => {
      console.log('test',test);
      const html = ReactDOMServer.renderToString((App));
      const initialState = client.extract();

      res.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Conduit</title>
            <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
            <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
            <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
            <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
            <link rel="stylesheet" href="//demo.productionready.io/main.css">
          </head>
          <body>
            <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
              window.__PRELOADED_STATE__ = ${JSON.stringify(initialState, null, 2).replace(/</g, '\\u003c')};
              window.__GWT__ = "${(req.signedCookies.token || '').replace(/</g, '\\u003c')}";
            </script>
            <section id="app">${html}</section>
            <script src='${assets(stats.common)}'></script>
            ${componentNames.map(componentName => `<script src='${assets(stats[componentName])}'></script>`)}
            `);
      res.end();
    }, (error)=>console.log(error));
  } catch(ex) {
    console.log('ex', ex);
  }
};
