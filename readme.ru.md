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

Реализован фронтенд универсального (изоморфного)приложения. В качестве бэкенда использован https://conduit.productionready.io/api

### Определение роутов

Роуты формируются определяются в простом объекте:

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

На основании этого объекта определяется серверный роутинг:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/serverRouter.js

и клиентский роутинг:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/clientRouter.js

### Code splitting

Code splitting реализуется при помощи инрамического импорта и библиотеки react-loadable:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/clientRouter.js

### Page component

Page component - это просто любой компонент который присутсвует в определении роутов:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/pages/home.js

Page component не обязательно распологать в каталоге /page. Его путь указываяется явно относительно каталога /src/react.

Page component - имеет предопределенную функцию которая будет вызвана на сервере при начальной загрузке приложения `static async getInitialProps({ req, dispatch, user, match })`

При клиентской загрузке компонента эту функцию необходимо вызвать явно:

```javascript
async componentDidMount() {
    if (this.props.history.action === 'POP' && this.props.hydrated) {
      await Home.getInitialProps(this.props);
    }
}
```

### Async link

На момент вызова componentDidMount() асинхронные данные как правило недоступны. Это влечет за собой необходимость инициализировать компоненты путсыми зщначепнниями или помещать их в блоки if. Как альтернатива выступает компонент AcyncLink который сначала загружает все необходимые данные а затем инициирует переход на роут указанный в ссылке:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/asyncLink.js

Пример использования:

https://github.com/apapacy/realworld-react-universal-hot/blob/master/src/react/components/menuItem.js

