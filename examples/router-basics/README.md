# router-basics

[Live demo](http://demo.thi.ng/umbrella/router-basics/)

```
git clone https://github.com/thi-ng/umbrella.git
cd umbrella/examples/router-basics
yarn install
yarn build
```

Unlike other examples, this one requires a local webserver to function, for example:

```
python -m SimpleHTTPServer
```

## About

This is the most advanced example in this repo thus far and deals with:

- App & component configuration
- Pure ES6 UI components
- Central app state handling
- Derived views
- SPA routing, route definitions & validation options
- Composable events, interceptors, side effects
- Async side effects
- Dynamic JSON content loading / transformation
- Component styling with [Tachyons CSS](http://tachyons.io/)


Btw. It is by design that loading of [user
#3](http://localhost:8000/#/users/3) ("Emilia Fox") is failing. This is
to demonstrate error handling behavior...
