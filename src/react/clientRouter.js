import { hot } from 'react-hot-loader';
import React from 'react';
import Loadable from 'react-loadable';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import Layout from './components/layout';

export default hot(module)(() => (
  <Layout>
    <Switch>
      {
        routes.map((props) => {
          props.component = Loadable({ // eslint-disable-line  no-param-reassign
            loader: () => import(`./${props.componentName}`).then(
              (component) => {
                if (module.hot) {
                  // hot(module)(component)
                  module.hot.accept(component, () => {
                    // if you are using harmony modules ({modules:false})
                    render(AppRouter)
                    // in all other cases - re-require App manually
                    render(component)
                  });
                }
                return component;
              },
            ), // eslint-disable-line
            loading: () => null,
            delay: 0,
            timeout: 10000,
          });
          return <Route key={props.path} {...props} />; // eslint-disable-line react/prop-types
        })
      }
    </Switch>
  </Layout>
));
