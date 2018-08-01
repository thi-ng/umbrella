# router-basics

[Live demo](https://demo.thi.ng/umbrella/router-basics/)

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella/examples/router-basics
yarn install
yarn start
```

Installs all dependencies, runs `webpack-dev-server` and opens the app in your browser.

## About

This example is based on the
[create-hdom-app](https://github.com/thi-ng/create-hdom-app) project
template and is one the most advanced example in this repo thus far.
Features covered:

- App & component configuration
- Pure ES6 UI components
- Central app state handling
- Derived views
- SPA routing, route definitions & validation options
- Composable events, interceptors, side effects
- Async side effects
- Dynamic JSON content loading / transformation
- Component styling with [Tachyons CSS](http://tachyons.io/)

### Production build

```bash
yarn build
```

Builds a minified version of the app and places it in `/public` directory.

## Authors

- Karsten Schmidt

&copy; 2018