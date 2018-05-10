import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import AppRouter from './react/clientRouter'; // eslint-disable-line
import createStore from './redux/store';
import { setHydrated } from './redux/services/hydrated';
import client from "./apolo/client";

const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line
delete window.__PRELOADED_STATE__; // eslint-disable-line
const store = createStore(preloadedState);

window.onload= () => store.dispatch(setHydrated()); // eslint-disable-line

hydrate(
  <ApolloProvider client={client}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      </ApolloProvider>,
  document.getElementById('app') // eslint-disable-line
);
