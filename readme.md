# ![RealWorld Example App](logo.png)

> ### [Realworld React Universal Hot](https://github.com/apapacy/realworld-react-universal-hot) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://realworld-react-universal-hot-iltreezyct.now.sh)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld React Universal Hot](https://github.com/apapacy/realworld-react-universal-hot)


This codebase was created to demonstrate a fully fledged fullstack application built with  including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Realworld React Universal Hot** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](ttps://github.com/gothinkster/realworld) repo.


## How it works

* Base on react, react-router 4, redux, express, webpack 4.
* Universal component for server side and client rendering.
* Provides a static async method getInitialProps for initializing the redux store.
* Code splitting with dynamic import()
* Hot reload on the server and on the client
* Unit test with jest and enzyme

## Install

> npm install

## Run test

> npm test

## Development mode

> npm run hot

## Code style

> npm lint

## Production mode

> npm run build

> npm start

## Getting started

The frontend of the universal (isomorphic) application is implemented. The backend is https://conduit.productionready.io/api

### Определение роутов

Routes are formed in a simple object:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/routes.js

```javascript

module.exports = [
  {
    path: '/',
    exact: true,
    componentName: 'pages/home',
  }, {
    path: '/page/:page',
    exact: true,
    componentName: 'pages/home',
  }, {
    path: '/feed',
    exact: true,
    componentName: 'pages/home',
  }, {
    path: '/feed/page/:page',
    exact: true,
    componentName: 'pages/home',
  }, {
    path: '/tag/:tag',
    exact: true,
    componentName: 'pages/home',
  }, {
    path: '/tag/:tag/page/:page',
    exact: true,
    componentName: 'pages/home',
  }, {
    path: '/(author|favorited)/:author',
    exact: true,
    componentName: 'pages/profile',
}, {
    ...
```

Based on this object, server routing is determined:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/serverRouter.js

and client routing:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/clientRouter.js

### Code splitting

Code splitting is implemented using dynamic import and the library react-loadable:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/clientRouter.js

### Page component

Page component is simply any component that is present in the definition of routing:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/pages/home.js

The Page component does not need to be located in the /page. Its path is indicated explicitly with respect to the /src/react directory.

Page component has a predefined function that will be called on the server when the application is booted `static async getInitialProps({ req, dispatch, user, match })`

When the component is booting from the client, this function must be called explicitly:

```javascript
async componentDidMount() {
    if (this.props.history.action === 'POP' && this.props.hydrated) {
      await Home.getInitialProps(this.props);
    }
}
```

### Async link

At the time componentDidMount () is called, asynchronous data is generally not available. This entails the need to initialize the components with extra characters or put them into the if blocks. As an alternative, the component AcyncLink appears which first loads all the necessary data and then initiates the transition to the router specified in the link:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/asyncLink.js

Example of use:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/components/menuItem.js
